using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Patient
    {
        public int PatientId { get; set; }
        
        [Required]
        [MaxLength(20)]
        public string MRN { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        
        public DateTime? DOB { get; set; }
        
        [MaxLength(10)]
        public string? Gender { get; set; }
        
        [MaxLength(20)]
        public string? Phone { get; set; }
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        public string? Address { get; set; }
        
        public string? MedicalHistory { get; set; }
        
        public string? Notes { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

        // Computed properties
        public string FullName => $"{FirstName} {LastName}";
        public int Age => DOB.HasValue ? DateTime.Now.Year - DOB.Value.Year : 0;
    }
}