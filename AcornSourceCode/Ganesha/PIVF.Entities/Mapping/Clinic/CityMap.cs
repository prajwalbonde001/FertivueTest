using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
using System.Data.Entity.ModelConfiguration;

//namespace PIVF.Gemino.Entities.Mapping.Clinic
namespace PIVF.Entities.Mapping.Clinic
{
    public class CityMap : EntityTypeConfiguration<City>
    {
        public CityMap()
        {
            this.HasKey(t => t.CityID);
            this.Property(t => t.CityCode)
                .IsRequired()
                .HasMaxLength(10);
            this.Property(t => t.StateID);
            this.Property(t => t.CityName)
                .IsRequired()
                .HasMaxLength(50);
            this.Property(t => t.DefaultCity);
            this.Property(t => t.Status);

            this.ToTable("M_CityMaster");
            this.Property(t => t.CityID).HasColumnName("CityID");
            this.Property(t => t.CityCode).HasColumnName("CityCode");
            this.Property(t => t.StateID).HasColumnName("StateID");
            this.Property(t => t.CityName).HasColumnName("CityName");
            this.Property(t => t.DefaultCity).HasColumnName("DefaultCity");
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
