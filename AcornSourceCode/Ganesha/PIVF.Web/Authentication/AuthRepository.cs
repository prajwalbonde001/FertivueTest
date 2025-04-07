using Dapper;
using DataBaseConfiguration;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PIVF.DataAccessLayer.Security;
using PIVF.Entities.Models.Login;
using PIVF.Entities.Models.Master.Configuration;
//using PIVF.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using DataBaseConfiguration;
namespace PIVF.Web.Api
{
    public class AuthRepository : IDisposable
    {
        private PIVFContext _ctx;

        private UserManager<IdentityUser> _userManager;

        DapperConnection con = new DapperConnection();

        public AuthRepository()
        {
            _ctx = new PIVFContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(string username, string pwd)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = SecurityDAL.EncryptString(username)
            };

            try
            {
                _userManager.PasswordValidator = new MinimumLengthValidator(0);

                _userManager.UserValidator = new UserValidator<IdentityUser>(_userManager)
                {
                    AllowOnlyAlphanumericUserNames = false
                };

                var result = await _userManager.CreateAsync(user, pwd);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = null;
            try
            {
                user = await _userManager.FindAsync(SecurityDAL.EncryptString(userName), password);
            }
            catch (Exception ex)
            {
                throw;
            }

            return user;
        }

        public Client FindClient(string clientId)
        {
            var client = _ctx.Clients.Find(clientId);

            return client;
        }

        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

            var existingToken = _ctx.RefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            _ctx.RefreshTokens.Add(token);

            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _ctx.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                _ctx.RefreshTokens.Remove(refreshToken);
                return await _ctx.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            _ctx.RefreshTokens.Remove(refreshToken);
            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _ctx.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<RefreshToken> GetAllRefreshTokens()
        {
            return _ctx.RefreshTokens.ToList();
        }

        public async Task<IdentityUser> FindAsync(UserLoginInfo loginInfo)
        {
            IdentityUser user = await _userManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<IdentityResult> CreateAsync(IdentityUser user)
        {
            var result = await _userManager.CreateAsync(user);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }

        public async Task<IdentityResult> ResetPassword(UserVO objUser)
        {
            ////IdentityUser user = await _userManager.FindByIdAsync(Id);
            //  user.ResetPassword = true;

            try
            {
                //  await _userManager.UpdateAsync(user);
                var result = await _userManager.RemovePasswordAsync(objUser.IDHash);
                _userManager.PasswordValidator = new MinimumLengthValidator(0);
                _userManager.UserValidator = new UserValidator<IdentityUser>(_userManager)
                {
                    AllowOnlyAlphanumericUserNames = false
                };
                result = await _userManager.AddPasswordAsync(objUser.IDHash, objUser.Password);
                if (result.Succeeded)
                {
                    var param = new DynamicParameters();
                    param.Add("@Action", "ClearSession");
                    param.Add("@LoginName", SecurityDAL.DecryptString(objUser.LoginName));
                    param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    this.con.DapCon.Query<int>(GenericSP.InsertUpdateUser, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public int checkCurrentPassword(string userName, string password)
        {
            IdentityUser user = _userManager.FindAsync(SecurityDAL.EncryptString(userName), password).Result;
            if (user != null)
            {
                return 0;
            }

            else return 1;

        }

        public UserVO CheckUser(string username, string password, string IPAddress, int UnitID)
        {
            UserVO Obj = null;
            string pwdHash = "";
            IdentityUser user = _userManager.FindAsync(SecurityDAL.EncryptString(username), password).Result;
            if (user != null)
            {
                pwdHash = user.PasswordHash;
            }
            else
            {
                pwdHash = password;
            }
            var param = new DynamicParameters();
            //  param.Add("@Action", "CheckUserExists");
            param.Add("@LoginName", SecurityDAL.EncryptString(username));
            param.Add("@Password", pwdHash);
            //param.Add("@LoginIP", IPAddress);
            param.Add("@UnitID", UnitID);
            //    param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);            
            Obj = this.con.DapCon.Query<UserVO>(GenericSP.CheckUserLogin, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Obj.SessionTimeOut = GenericSP.SessionTimeout;
            //return this.con.DapCon.Query<UserVO>(GenericSP.CheckUserLogin, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Obj;
            // return null;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}