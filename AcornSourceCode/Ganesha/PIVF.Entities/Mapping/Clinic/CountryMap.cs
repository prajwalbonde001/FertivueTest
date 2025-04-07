using PIVF.Entities.Models.Master.Clinic;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Mapping.Clinic
{
    public class CountryMap : EntityTypeConfiguration<Country>
    {
        public CountryMap()
        {
            this.HasKey(t => t.CountryID);
            this.Property(t => t.CountryCode)
                .IsRequired()
                .HasMaxLength(10);
            this.Property(t => t.CountryName)
                .IsRequired()
                .HasMaxLength(50);
            this.Property(t => t.DefaultCountry);
            this.Property(t => t.Status);
            this.Property(t => t.OrderBy);

            this.ToTable("M_CountryMaster");
            this.Property(t => t.CountryID).HasColumnName("CountryID");
            this.Property(t => t.CountryCode).HasColumnName("CountryCode");
            this.Property(t => t.CountryName).HasColumnName("CountryName");
            this.Property(t => t.DefaultCountry).HasColumnName("DefaultCountry");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.OrderBy).HasColumnName("OrderBy");
        }
    }
}
