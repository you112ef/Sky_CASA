using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Exam
    {
        public int ExamId { get; set; }
        
        [Required]
        public int PatientId { get; set; }
        
        public DateTime ExamDate { get; set; } = DateTime.UtcNow;
        
        [Required]
        [MaxLength(50)]
        public string ExamType { get; set; } = string.Empty;
        
        public int? TechnicianId { get; set; }
        
        public int? DoctorId { get; set; }
        
        [MaxLength(20)]
        public string Status { get; set; } = "In Progress";
        
        [MaxLength(20)]
        public string Priority { get; set; } = "Normal";
        
        public string? ClinicalNotes { get; set; }
        
        public string? Results { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Patient Patient { get; set; } = null!;
        public virtual User? Technician { get; set; }
        public virtual User? Doctor { get; set; }
        public virtual ICollection<Sample> Samples { get; set; } = new List<Sample>();
        public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

        // Computed properties
        public bool IsCompleted => Status == "Completed";
        public bool IsUrgent => Priority == "Urgent";
        public int SampleCount => Samples.Count;
        public int ReportCount => Reports.Count;
    }
}