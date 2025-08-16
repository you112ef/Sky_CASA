using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class AuditLog
    {
        public int LogId { get; set; }
        
        public int? UserId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string TargetType { get; set; } = string.Empty;
        
        public int? TargetId { get; set; }
        
        public string? OldValues { get; set; }
        
        public string? NewValues { get; set; }
        
        public string? IpAddress { get; set; }
        
        public string? UserAgent { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual User? User { get; set; }

        // Computed properties
        public bool HasUser => UserId.HasValue;
        public bool HasTarget => TargetId.HasValue;
        public bool HasChanges => !string.IsNullOrEmpty(OldValues) || !string.IsNullOrEmpty(NewValues);
        public string ActionDisplay => Action switch
        {
            "Create" => "إنشاء",
            "Update" => "تحديث",
            "Delete" => "حذف",
            "Login" => "تسجيل دخول",
            "Logout" => "تسجيل خروج",
            "Export" => "تصدير",
            "Import" => "استيراد",
            "Backup" => "نسخ احتياطي",
            "Restore" => "استرجاع",
            _ => Action
        };
    }
}