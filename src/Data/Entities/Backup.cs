using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Backup
    {
        public int BackupId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string BackupName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; } = string.Empty;
        
        public long? FileSize { get; set; }
        
        [MaxLength(20)]
        public string? BackupType { get; set; }
        
        [MaxLength(20)]
        public string Status { get; set; } = "In Progress";
        
        public int? CreatedBy { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? CompletedAt { get; set; }
        
        public string? ErrorMessage { get; set; }

        // Navigation properties
        public virtual User? CreatedByUser { get; set; }

        // Computed properties
        public bool IsInProgress => Status == "In Progress";
        public bool IsCompleted => Status == "Completed";
        public bool HasFailed => Status == "Failed";
        public bool IsManual => BackupType == "Manual";
        public bool IsAutomatic => BackupType == "Automatic";
        public bool IsScheduled => BackupType == "Scheduled";
        public TimeSpan? Duration => CompletedAt.HasValue ? CompletedAt.Value - CreatedAt : null;
        public string FileSizeFormatted => FileSize.HasValue ? FormatFileSize(FileSize.Value) : "Unknown";
        public string StatusDisplay => Status switch
        {
            "In Progress" => "قيد التنفيذ",
            "Completed" => "مكتمل",
            "Failed" => "فشل",
            _ => Status
        };

        private static string FormatFileSize(long bytes)
        {
            string[] sizes = { "B", "KB", "MB", "GB" };
            int order = 0;
            double size = bytes;
            
            while (size >= 1024 && order < sizes.Length - 1)
            {
                order++;
                size /= 1024;
            }
            
            return $"{size:0.##} {sizes[order]}";
        }
    }
}