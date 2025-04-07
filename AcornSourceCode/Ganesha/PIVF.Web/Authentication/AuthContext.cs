using Microsoft.AspNet.Identity.EntityFramework;
using PIVF.Entities.Models.Login;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PIVF.Web.Api
{
    public class PIVFContext : IdentityDbContext<IdentityUser>
    {
        static PIVFContext()
        {
            Database.SetInitializer<PIVFContext>(null);
        }

        public PIVFContext()
            : base("PIVFContext")
        {

        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}