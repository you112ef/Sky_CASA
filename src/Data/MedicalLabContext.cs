using Microsoft.EntityFrameworkCore;
using MedicalLabAnalyzer.Data.Entities;

namespace MedicalLabAnalyzer.Data
{
    public class MedicalLabContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<Sample> Samples { get; set; }
        public DbSet<VideoFile> Videos { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Morphology> Morphologies { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<Backup> Backups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var dbPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Database", "medical_lab.db");
                optionsBuilder.UseSqlite($"Data Source={dbPath}");
                
#if DEBUG
                optionsBuilder.EnableSensitiveDataLogging();
                optionsBuilder.EnableDetailedErrors();
#endif
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.PasswordSalt).IsRequired();
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
                entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("datetime('now')");
            });

            // Patient configuration
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.PatientId);
                entity.HasIndex(e => e.MRN).IsUnique();
                entity.Property(e => e.MRN).IsRequired().HasMaxLength(20);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Gender).HasMaxLength(10);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("datetime('now')");
            });

            // Exam configuration
            modelBuilder.Entity<Exam>(entity =>
            {
                entity.HasKey(e => e.ExamId);
                entity.Property(e => e.ExamDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.ExamType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).HasDefaultValue("In Progress").HasMaxLength(20);
                entity.Property(e => e.Priority).HasDefaultValue("Normal").HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Patient)
                    .WithMany(p => p.Exams)
                    .HasForeignKey(e => e.PatientId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(e => e.Technician)
                    .WithMany()
                    .HasForeignKey(e => e.TechnicianId)
                    .OnDelete(DeleteBehavior.SetNull);
                
                entity.HasOne(e => e.Doctor)
                    .WithMany()
                    .HasForeignKey(e => e.DoctorId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // Sample configuration
            modelBuilder.Entity<Sample>(entity =>
            {
                entity.HasKey(e => e.SampleId);
                entity.HasIndex(e => e.SampleNumber).IsUnique();
                entity.Property(e => e.SampleNumber).IsRequired().HasMaxLength(20);
                entity.Property(e => e.CollectionDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.ChamberType).HasMaxLength(20);
                entity.Property(e => e.SampleQuality).HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Exam)
                    .WithMany(ex => ex.Samples)
                    .HasForeignKey(e => e.ExamId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Video configuration
            modelBuilder.Entity<VideoFile>(entity =>
            {
                entity.HasKey(e => e.VideoId);
                entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Path).IsRequired().HasMaxLength(500);
                entity.Property(e => e.Resolution).HasMaxLength(50);
                entity.Property(e => e.Codec).HasMaxLength(20);
                entity.Property(e => e.ProcessingStatus).HasDefaultValue("Pending").HasMaxLength(20);
                entity.Property(e => e.UploadDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Sample)
                    .WithMany(s => s.Videos)
                    .HasForeignKey(e => e.SampleId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Track configuration
            modelBuilder.Entity<Track>(entity =>
            {
                entity.HasKey(e => e.TrackId);
                entity.Property(e => e.TrackNumber).IsRequired();
                entity.Property(e => e.Classification).HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Video)
                    .WithMany(v => v.Tracks)
                    .HasForeignKey(e => e.VideoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Morphology configuration
            modelBuilder.Entity<Morphology>(entity =>
            {
                entity.HasKey(e => e.MorphId);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Sample)
                    .WithMany(s => s.Morphologies)
                    .HasForeignKey(e => e.SampleId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Report configuration
            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.ReportId);
                entity.HasIndex(e => e.ReportNumber).IsUnique();
                entity.Property(e => e.ReportNumber).IsRequired().HasMaxLength(20);
                entity.Property(e => e.ReportType).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Status).HasDefaultValue("Draft").HasMaxLength(20);
                entity.Property(e => e.GeneratedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.Exam)
                    .WithMany(ex => ex.Reports)
                    .HasForeignKey(e => e.ExamId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(e => e.GeneratedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.GeneratedBy)
                    .OnDelete(DeleteBehavior.SetNull);
                
                entity.HasOne(e => e.ApprovedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.ApprovedBy)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // AuditLog configuration
            modelBuilder.Entity<AuditLog>(entity =>
            {
                entity.HasKey(e => e.LogId);
                entity.Property(e => e.Action).IsRequired().HasMaxLength(100);
                entity.Property(e => e.TargetType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // Backup configuration
            modelBuilder.Entity<Backup>(entity =>
            {
                entity.HasKey(e => e.BackupId);
                entity.Property(e => e.BackupName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FilePath).IsRequired().HasMaxLength(500);
                entity.Property(e => e.BackupType).HasMaxLength(20);
                entity.Property(e => e.Status).HasDefaultValue("In Progress").HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                
                entity.HasOne(e => e.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedBy)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}