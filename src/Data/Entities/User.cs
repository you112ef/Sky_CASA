using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class User
    {
        public int UserId { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        
        [Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        
        [Required]
        [MaxLength(20)]
        public string Role { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime? LastLoginAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Exam> TechnicianExams { get; set; } = new List<Exam>();
        public virtual ICollection<Exam> DoctorExams { get; set; } = new List<Exam>();
        public virtual ICollection<Report> GeneratedReports { get; set; } = new List<Report>();
        public virtual ICollection<Report> ApprovedReports { get; set; } = new List<Report>();
        public virtual ICollection<Backup> CreatedBackups { get; set; } = new List<Backup>();
        public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();
    }
}