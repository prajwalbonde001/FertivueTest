using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.Entities.Mapping.Clinic
namespace PIVF.Entities.Mapping.Clinic
{
    public class DesignationMap : EntityTypeConfiguration<Designation>
    {
        public DesignationMap()
        {
            this.HasKey(t => t.DegID);

            // Properties
            this.Property(t => t.DegCode)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.Description)
                .HasMaxLength(50);

            this.Property(t => t.IsBDM);
            this.Property(t => t.Status);
            this.Property(t => t.CreatedUnitID);
            this.Property(t => t.UpdatedUnitID);
            this.Property(t => t.AddedBy);
            this.Property(t => t.AddedOn);
            this.Property(t => t.AddedDateTime);
            this.Property(t => t.AddedUTCDateTime);
            this.Property(t => t.UpdatedBy);
            this.Property(t => t.UpdatedOn);
            this.Property(t => t.UpdatedDateTime);
            this.Property(t => t.UpdatedUTCDateTime);
            this.Property(t => t.AddedWindowsLoginName);
            this.Property(t => t.UpdateWindowsLoginName);
            this.Property(t => t.Synchronized);


            // Table & Column Mappings
            this.ToTable("M_DesignationMaster");
            this.Property(t => t.DegID).HasColumnName("DegID");
            this.Property(t => t.DegCode).HasColumnName("DegCode");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.IsBDM).HasColumnName("IsBDM");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedUnitID).HasColumnName("CreatedUnitID");
            this.Property(t => t.UpdatedUnitID).HasColumnName("UpdatedUnitID");
            this.Property(t => t.AddedBy).HasColumnName("AddedBy");
            this.Property(t => t.AddedOn).HasColumnName("AddedOn");
            this.Property(t => t.UpdatedOn).HasColumnName("UpdatedOn");
            this.Property(t => t.AddedDateTime).HasColumnName("AddedDateTime");
            this.Property(t => t.AddedUTCDateTime).HasColumnName("AddedUTCDateTime");
            this.Property(t => t.UpdatedBy).HasColumnName("UpdatedBy");
            this.Property(t => t.UpdatedDateTime).HasColumnName("UpdatedDateTime");
            this.Property(t => t.UpdatedUTCDateTime).HasColumnName("UpdatedUTCDateTime");
            this.Property(t => t.AddedWindowsLoginName).HasColumnName("AddedWindowsLoginName");
            this.Property(t => t.UpdateWindowsLoginName).HasColumnName("UpdateWindowsLoginName");
            this.Property(t => t.Synchronized).HasColumnName("Synchronized");
        }
    }
}
