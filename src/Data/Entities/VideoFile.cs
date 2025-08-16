using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class VideoFile
    {
        public int VideoId { get; set; }
        
        [Required]
        public int SampleId { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string FileName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(500)]
        public string Path { get; set; } = string.Empty;
        
        public long? FileSize { get; set; }
        
        public double? Duration { get; set; }
        
        [MaxLength(50)]
        public string? Resolution { get; set; }
        
        public int? FrameCount { get; set; }
        
        [MaxLength(20)]
        public string? Codec { get; set; }
        
        public int? BitRate { get; set; }
        
        public DateTime UploadDate { get; set; } = DateTime.UtcNow;
        
        [MaxLength(20)]
        public string ProcessingStatus { get; set; } = "Pending";
        
        public DateTime? ProcessingDate { get; set; }
        
        public string? ErrorMessage { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Sample Sample { get; set; } = null!;
        public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();

        // Computed properties
        public bool IsProcessed => ProcessingStatus == "Completed";
        public bool IsProcessing => ProcessingStatus == "Processing";
        public bool HasError => ProcessingStatus == "Failed";
        public int TrackCount => Tracks.Count;
        public string FileSizeFormatted => FileSize.HasValue ? FormatFileSize(FileSize.Value) : "Unknown";
        public string DurationFormatted => Duration.HasValue ? FormatDuration(Duration.Value) : "Unknown";

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

        private static string FormatDuration(double seconds)
        {
            var timeSpan = TimeSpan.FromSeconds(seconds);
            return $"{timeSpan.Minutes:D2}:{timeSpan.Seconds:D2}";
        }
    }
}