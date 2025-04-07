using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
using System.Data.Entity.ModelConfiguration;

//namespace PIVF.Gemino.Entities.Mapping.Clinic
namespace PIVF.Entities.Mapping.Clinic
{
    public class StateMap : EntityTypeConfiguration<State>
    {
        public StateMap()
        {
            this.HasKey(t => t.StateID);
            this.Property(t => t.StateCode)
                .IsRequired()
                .HasMaxLength(10);
            this.Property(t => t.CountryID);
            this.Property(t => t.StateName)
                .IsRequired()
                .HasMaxLength(50);
            this.Property(t => t.DefaultState);
            this.Property(t => t.Status);
            this.ToTable("M_StateMaster");
            this.Property(t => t.StateID).HasColumnName("StateID");
            this.Property(t => t.StateCode).HasColumnName("StateCode");
            this.Property(t => t.CountryID).HasColumnName("CountryID");
            this.Property(t => t.StateName).HasColumnName("StateName");
            this.Property(t => t.DefaultState).HasColumnName("DefaultState");
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
