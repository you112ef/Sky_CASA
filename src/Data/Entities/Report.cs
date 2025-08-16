using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Report
    {
        public int ReportId { get; set; }
        
        [Required]
        public int ExamId { get; set; }
        
        [Required]
        [MaxLength(20)]
        public string ReportType { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(20)]
        public string ReportNumber { get; set; } = string.Empty;
        
        public string? PdfPath { get; set; }
        
        public string? ExcelPath { get; set; }
        
        public int? GeneratedBy { get; set; }
        
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
        
        [MaxLength(20)]
        public string Status { get; set; } = "Draft";
        
        public DateTime? ApprovalDate { get; set; }
        
        public int? ApprovedBy { get; set; }
        
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Exam Exam { get; set; } = null!;
        public virtual User? GeneratedByUser { get; set; }
        public virtual User? ApprovedByUser { get; set; }

        // Computed properties
        public bool IsDraft => Status == "Draft";
        public bool IsFinal => Status == "Final";
        public bool IsApproved => Status == "Approved";
        public bool IsPrinted => Status == "Printed";
        public bool HasPdf => !string.IsNullOrEmpty(PdfPath);
        public bool HasExcel => !string.IsNullOrEmpty(ExcelPath);
        public bool IsApprovedByUser => ApprovedBy.HasValue;
        public string StatusDisplay => Status switch
        {
            "Draft" => "مسودة",
            "Final" => "نهائي",
            "Approved" => "معتمد",
            "Printed" => "مطبوع",
            _ => Status
        };
    }
}