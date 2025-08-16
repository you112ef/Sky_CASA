using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Sample
    {
        public int SampleId { get; set; }
        
        [Required]
        public int ExamId { get; set; }
        
        [Required]
        [MaxLength(20)]
        public string SampleNumber { get; set; } = string.Empty;
        
        public DateTime CollectionDate { get; set; } = DateTime.UtcNow;
        
        public string? CollectionTime { get; set; }
        
        [MaxLength(20)]
        public string? ChamberType { get; set; }
        
        public double? Dilution { get; set; }
        
        public int? Magnification { get; set; }
        
        public int? FrameRate { get; set; }
        
        public double? MicronsPerPixel { get; set; }
        
        public double? Temperature { get; set; }
        
        public double? pH { get; set; }
        
        public string? Viscosity { get; set; }
        
        public string? Color { get; set; }
        
        public double? Volume { get; set; }
        
        public int? LiquefactionTime { get; set; }
        
        [MaxLength(20)]
        public string? SampleQuality { get; set; }
        
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Exam Exam { get; set; } = null!;
        public virtual ICollection<VideoFile> Videos { get; set; } = new List<VideoFile>();
        public virtual ICollection<Morphology> Morphologies { get; set; } = new List<Morphology>();

        // Computed properties
        public bool HasVideos => Videos.Any();
        public bool HasMorphology => Morphologies.Any();
        public int VideoCount => Videos.Count;
        public int MorphologyCount => Morphologies.Count;
    }
}