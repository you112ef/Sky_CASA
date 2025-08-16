using System.ComponentModel.DataAnnotations;

namespace MedicalLabAnalyzer.Data.Entities
{
    public class Track
    {
        public int TrackId { get; set; }
        
        [Required]
        public int VideoId { get; set; }
        
        [Required]
        public int TrackNumber { get; set; }
        
        public int? StartFrame { get; set; }
        
        public int? EndFrame { get; set; }
        
        public int? TotalFrames { get; set; }
        
        // CASA Motility Parameters
        public double? MeanVCL { get; set; } // Curvilinear Velocity (μm/s)
        public double? MeanVSL { get; set; } // Straight Line Velocity (μm/s)
        public double? MeanVAP { get; set; } // Average Path Velocity (μm/s)
        public double? ALH { get; set; }     // Amplitude of Lateral Head Displacement (μm)
        public double? BCF { get; set; }     // Beat Cross Frequency (Hz)
        public double? LIN { get; set; }     // Linearity (%)
        public double? STR { get; set; }     // Straightness (%)
        public double? WOB { get; set; }     // Wobble (%)
        public double? MAD { get; set; }     // Mean Angular Displacement (degrees)
        public double? Progressivity { get; set; } // Progressivity (μm/s)
        
        [MaxLength(20)]
        public string? Classification { get; set; }
        
        public double? TrackQuality { get; set; }
        
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual VideoFile Video { get; set; } = null!;

        // Computed properties
        public bool IsProgressive => Classification == "Progressive";
        public bool IsNonProgressive => Classification == "Non-Progressive";
        public bool IsImmotile => Classification == "Immotile";
        public double? TrackDuration => TotalFrames.HasValue && Video.FrameRate.HasValue ? 
            TotalFrames.Value / (double)Video.FrameRate.Value : null;
        public double? AverageVelocity => MeanVAP ?? MeanVCL ?? MeanVSL;
        public bool HasValidData => MeanVCL.HasValue && MeanVSL.HasValue && MeanVAP.HasValue;
    }
}