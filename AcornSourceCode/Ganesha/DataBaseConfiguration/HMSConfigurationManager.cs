﻿using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Reflection;

namespace DataBaseConfiguration
{
    static public class HMSConfigurationManager
    {
        #region Variables Declaration
        private static Database dbServer = null;
        #endregion

        public static Database GetDatabaseReference()
        {
            try
            {
                if (dbServer == null)
                {
                    //IConfigurationSource source = new FileConfigurationSource(@"Configuration\ApplicationConfiguration\Application.config");
                    //DatabaseProviderFactory factory = new DatabaseProviderFactory(source);
                    dbServer = DatabaseFactory.CreateDatabase("PIVFContext");
                }
                return dbServer;
            }
            catch (System.Configuration.ConfigurationException cex)
            {
                throw;
            }
            catch (TargetInvocationException TIEx)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
