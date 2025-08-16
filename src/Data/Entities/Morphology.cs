using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Morphology
    {
        public int MorphId { get; set; }
        
        [Required]
        public int SampleId { get; set; }
        
        public int? SpermCount { get; set; }
        public int? NormalCount { get; set; }
        public int? AbnormalCount { get; set; }
        public int? HeadAbnormalCount { get; set; }
        public int? MidpieceAbnormalCount { get; set; }
        public int? TailAbnormalCount { get; set; }
        
        // Morphological Measurements (μm)
        public double? HeadArea { get; set; }
        public double? HeadPerimeter { get; set; }
        public double? HeadLength { get; set; }
        public double? HeadWidth { get; set; }
        public double? MidpieceLength { get; set; }
        public double? TailLength { get; set; }
        public double? TotalLength { get; set; }
        
        // Percentages
        public double? NormalPercentage { get; set; }
        public double? AbnormalPercentage { get; set; }
        public double? HeadAbnormalPercentage { get; set; }
        public double? MidpieceAbnormalPercentage { get; set; }
        public double? TailAbnormalPercentage { get; set; }
        
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Sample Sample { get; set; } = null!;

        // Computed properties
        public bool HasCompleteData => SpermCount.HasValue && NormalCount.HasValue && AbnormalCount.HasValue;
        public int? TotalAbnormalCount => (HeadAbnormalCount ?? 0) + (MidpieceAbnormalCount ?? 0) + (TailAbnormalCount ?? 0);
        public double? NormalMorphologyPercentage => SpermCount.HasValue && SpermCount.Value > 0 ? 
            (NormalCount ?? 0) * 100.0 / SpermCount.Value : null;
        public bool IsNormalMorphology => NormalMorphologyPercentage >= 4.0; // WHO 2010 criteria
        public string MorphologyGrade => NormalMorphologyPercentage switch
        {
            >= 15.0 => "Excellent",
            >= 10.0 => "Good",
            >= 5.0 => "Fair",
            >= 4.0 => "Poor",
            _ => "Very Poor"
        };
    }
}