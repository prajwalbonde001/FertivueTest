using System.Data.Entity;
using Repository.Pattern.Ef6;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Clinic;
//using PIVF.Entities.Models.Clinic;

namespace PIVF.Entities.Models
{
    public partial class PIVFContext : DataContext
    {
        static PIVFContext()
        {
            Database.SetInitializer<PIVFContext>(null);
        }

        public PIVFContext()
            : base("Name=PIVFContext")
        {
        }

        public DbSet<Tickets> Ticket { get; set; }

        

        #region Added on 10102019 for Clinic & Staff master merging


        public DbSet<Country> dbCountry { get; set; }
        public DbSet<State> dbState { get; set; }
        public DbSet<City> dbCity { get; set; }
       
        public DbSet<Department> Department { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Schedule> Schedules { get; set; }   // added sujata for schedule

        #endregion



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            #region Added on 10102019 for Clinic & Staff master merging

            modelBuilder.Configurations.Add(new CountryMap());
            modelBuilder.Configurations.Add(new StateMap());
            modelBuilder.Configurations.Add(new CityMap());
            modelBuilder.Configurations.Add(new DepartmentMap());
            modelBuilder.Configurations.Add(new DesignationMap());

            #endregion
        }
        public System.Data.Entity.DbSet<PIVF.Entities.Models.Clinic.DoctorAppointments> DoctorAppointments { get; set; }

    }
}
