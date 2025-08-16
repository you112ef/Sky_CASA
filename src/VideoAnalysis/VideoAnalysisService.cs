using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using MedicalLabAnalyzer.Data.Entities;
using MedicalLabAnalyzer.Common;

namespace MedicalLabAnalyzer.VideoAnalysis
{
    public class VideoAnalysisService
    {
        private readonly string _outputDirectory;
        private readonly ILogger _logger;

        public VideoAnalysisService(string outputDirectory = "VideoAnalysis")
        {
            _outputDirectory = outputDirectory;
            Directory.CreateDirectory(_outputDirectory);
            
            // Initialize logger (you can inject this)
            _logger = new ConsoleLogger();
        }

        /// <summary>
        /// Analyzes a video file and extracts CASA metrics
        /// </summary>
        /// <param name="videoPath">Path to the video file</param>
        /// <param name="sample">Sample information</param>
        /// <returns>Analysis results</returns>
        public async Task<VideoAnalysisResult> AnalyzeVideoAsync(string videoPath, Sample sample)
        {
            try
            {
                _logger.LogInformation($"Starting video analysis for: {Path.GetFileName(videoPath)}");

                if (!File.Exists(videoPath))
                {
                    throw new FileNotFoundException($"Video file not found: {videoPath}");
                }

                // Load video
                using var capture = new VideoCapture(videoPath);
                if (!capture.IsOpened)
                {
                    throw new InvalidOperationException("Failed to open video file");
                }

                var frameCount = (int)capture.Get(CapProp.FrameCount);
                var fps = capture.Get(CapProp.Fps);
                var duration = frameCount / fps;

                _logger.LogInformation($"Video loaded: {frameCount} frames, {fps:F2} FPS, {duration:F2}s duration");

                // Extract frames for analysis
                var frames = await ExtractFramesAsync(capture, frameCount);
                
                // Detect and track sperm
                var tracks = await DetectAndTrackSpermAsync(frames, sample);
                
                // Calculate CASA metrics
                var metrics = CalculateCASAMetrics(tracks, sample);
                
                // Generate analysis report
                var report = GenerateAnalysisReport(videoPath, sample, tracks, metrics);

                _logger.LogInformation($"Video analysis completed. Found {tracks.Count} tracks");

                return new VideoAnalysisResult
                {
                    VideoPath = videoPath,
                    SampleId = sample.SampleId,
                    TotalFrames = frameCount,
                    FrameRate = fps,
                    Duration = duration,
                    Tracks = tracks,
                    Metrics = metrics,
                    Report = report,
                    AnalysisDate = DateTime.UtcNow,
                    Success = true
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Video analysis failed: {ex.Message}");
                return new VideoAnalysisResult
                {
                    VideoPath = videoPath,
                    SampleId = sample.SampleId,
                    Success = false,
                    ErrorMessage = ex.Message,
                    AnalysisDate = DateTime.UtcNow
                };
            }
        }

        /// <summary>
        /// Extracts frames from video for analysis
        /// </summary>
        private async Task<List<Mat>> ExtractFramesAsync(VideoCapture capture, int frameCount)
        {
            var frames = new List<Mat>();
            var step = Math.Max(1, frameCount / 100); // Sample every nth frame for performance

            for (int i = 0; i < frameCount; i += step)
            {
                capture.Set(CapProp.PosFrames, i);
                var frame = new Mat();
                if (capture.Read(frame) && !frame.IsEmpty)
                {
                    frames.Add(frame.Clone());
                }
                frame.Dispose();
            }

            _logger.LogInformation($"Extracted {frames.Count} frames for analysis");
            return frames;
        }

        /// <summary>
        /// Detects and tracks sperm in video frames
        /// </summary>
        private async Task<List<SpermTrack>> DetectAndTrackSpermAsync(List<Mat> frames, Sample sample)
        {
            var tracks = new List<SpermTrack>();
            var trackId = 0;

            // Background subtraction for motion detection
            using var bgSubtractor = new BackgroundSubtractorMOG2();
            
            for (int i = 0; i < frames.Count - 1; i++)
            {
                var currentFrame = frames[i];
                var nextFrame = frames[i + 1];

                // Convert to grayscale
                using var grayCurrent = new Mat();
                using var grayNext = new Mat();
                CvInvoke.CvtColor(currentFrame, grayCurrent, ColorConversion.Bgr2Gray);
                CvInvoke.CvtColor(nextFrame, grayNext, ColorConversion.Bgr2Gray);

                // Background subtraction
                using var fgMask = new Mat();
                bgSubtractor.Apply(grayCurrent, fgMask);

                // Morphological operations to clean up the mask
                using var kernel = CvInvoke.GetStructuringElement(ElementShape.Ellipse, new Size(3, 3));
                using var cleanedMask = new Mat();
                CvInvoke.MorphologyEx(fgMask, cleanedMask, MorphOp.Open, kernel);

                // Find contours
                using var contours = new VectorOfVectorOfPoint();
                using var hierarchy = new Mat();
                CvInvoke.FindContours(cleanedMask, contours, hierarchy, RetrType.External, ChainApproxMethod.ChainApproxSimple);

                // Process each contour
                for (int j = 0; j < contours.Size; j++)
                {
                    var contour = contours[j];
                    var area = CvInvoke.ContourArea(contour);

                    // Filter by area (sperm size range)
                    if (area > 50 && area < 500)
                    {
                        var boundingRect = CvInvoke.BoundingRectangle(contour);
                        
                        // Create or update track
                        var track = tracks.FirstOrDefault(t => 
                            Math.Abs(t.Center.X - boundingRect.X) < 20 && 
                            Math.Abs(t.Center.Y - boundingRect.Y) < 20);

                        if (track == null)
                        {
                            track = new SpermTrack
                            {
                                TrackId = ++trackId,
                                StartFrame = i,
                                Positions = new List<PointF>(),
                                Areas = new List<double>()
                            };
                            tracks.Add(track);
                        }

                        var center = new PointF(
                            boundingRect.X + boundingRect.Width / 2f,
                            boundingRect.Y + boundingRect.Height / 2f
                        );

                        track.Positions.Add(center);
                        track.Areas.Add(area);
                        track.EndFrame = i;
                        track.Center = center;
                    }
                }
            }

            // Filter tracks by minimum length
            tracks = tracks.Where(t => t.Positions.Count >= 5).ToList();

            _logger.LogInformation($"Detected {tracks.Count} sperm tracks");
            return tracks;
        }

        /// <summary>
        /// Calculates CASA metrics from tracked sperm
        /// </summary>
        private CASAMetrics CalculateCASAMetrics(List<SpermTrack> tracks, Sample sample)
        {
            if (!tracks.Any())
                return new CASAMetrics();

            var metrics = new CASAMetrics();
            var micronsPerPixel = sample.MicronsPerPixel ?? 1.0;
            var frameRate = sample.FrameRate ?? 30.0;

            foreach (var track in tracks)
            {
                if (track.Positions.Count < 2) continue;

                // Calculate velocities
                var velocities = new List<double>();
                var distances = new List<double>();
                var angles = new List<double>();

                for (int i = 1; i < track.Positions.Count; i++)
                {
                    var prev = track.Positions[i - 1];
                    var curr = track.Positions[i];
                    
                    var distance = Math.Sqrt(Math.Pow(curr.X - prev.X, 2) + Math.Pow(curr.Y - prev.Y, 2));
                    var velocity = distance * micronsPerPixel * frameRate; // μm/s
                    
                    velocities.Add(velocity);
                    distances.Add(distance * micronsPerPixel);

                    if (i > 1)
                    {
                        var prev2 = track.Positions[i - 2];
                        var angle = CalculateAngle(prev2, prev, curr);
                        angles.Add(angle);
                    }
                }

                if (velocities.Any())
                {
                    track.MeanVCL = velocities.Average(); // Curvilinear Velocity
                    track.MeanVSL = CalculateStraightLineVelocity(track.Positions.First(), track.Positions.Last(), 
                        track.Positions.Count, frameRate, micronsPerPixel);
                    track.MeanVAP = velocities.Average(); // Average Path Velocity (simplified)
                    track.ALH = angles.Any() ? angles.Average() : 0; // Amplitude of Lateral Head Displacement
                    track.BCF = CalculateBCF(angles, frameRate); // Beat Cross Frequency
                    track.LIN = track.MeanVSL / track.MeanVCL * 100; // Linearity
                    track.STR = track.MeanVSL / track.MeanVAP * 100; // Straightness
                    track.WOB = track.MeanVAP / track.MeanVCL * 100; // Wobble
                }
            }

            // Calculate overall metrics
            if (tracks.Any(t => t.MeanVCL.HasValue))
            {
                metrics.MeanVCL = tracks.Where(t => t.MeanVCL.HasValue).Average(t => t.MeanVCL.Value);
                metrics.MeanVSL = tracks.Where(t => t.MeanVSL.HasValue).Average(t => t.MeanVSL.Value);
                metrics.MeanVAP = tracks.Where(t => t.MeanVAP.HasValue).Average(t => t.MeanVAP.Value);
                metrics.MeanALH = tracks.Where(t => t.ALH.HasValue).Average(t => t.ALH.Value);
                metrics.MeanBCF = tracks.Where(t => t.BCF.HasValue).Average(t => t.BCF.Value);
                metrics.MeanLIN = tracks.Where(t => t.LIN.HasValue).Average(t => t.LIN.Value);
                metrics.MeanSTR = tracks.Where(t => t.STR.HasValue).Average(t => t.STR.Value);
                metrics.MeanWOB = tracks.Where(t => t.WOB.HasValue).Average(t => t.WOB.Value);
            }

            metrics.TotalTracks = tracks.Count;
            metrics.ProgressiveTracks = tracks.Count(t => t.LIN > 50);
            metrics.NonProgressiveTracks = tracks.Count(t => t.LIN <= 50 && t.LIN > 10);
            metrics.ImmotileTracks = tracks.Count(t => t.LIN <= 10);

            return metrics;
        }

        /// <summary>
        /// Calculates angle between three points
        /// </summary>
        private double CalculateAngle(PointF p1, PointF p2, PointF p3)
        {
            var v1 = new PointF(p1.X - p2.X, p1.Y - p2.Y);
            var v2 = new PointF(p3.X - p2.X, p3.Y - p2.Y);
            
            var dot = v1.X * v2.X + v1.Y * v2.Y;
            var det = v1.X * v2.Y - v1.Y * v2.X;
            
            return Math.Atan2(det, dot) * 180 / Math.PI;
        }

        /// <summary>
        /// Calculates straight line velocity
        /// </summary>
        private double CalculateStraightLineVelocity(PointF start, PointF end, int frames, double frameRate, double micronsPerPixel)
        {
            var distance = Math.Sqrt(Math.Pow(end.X - start.X, 2) + Math.Pow(end.Y - start.Y, 2));
            var time = frames / frameRate;
            return distance * micronsPerPixel / time;
        }

        /// <summary>
        /// Calculates Beat Cross Frequency
        /// </summary>
        private double CalculateBCF(List<double> angles, double frameRate)
        {
            if (!angles.Any()) return 0;
            
            var crossings = 0;
            for (int i = 1; i < angles.Count; i++)
            {
                if ((angles[i - 1] > 0 && angles[i] < 0) || 
                    (angles[i - 1] < 0 && angles[i] > 0))
                {
                    crossings++;
                }
            }
            
            var duration = angles.Count / frameRate;
            return crossings / duration;
        }

        /// <summary>
        /// Generates analysis report
        /// </summary>
        private string GenerateAnalysisReport(string videoPath, Sample sample, List<SpermTrack> tracks, CASAMetrics metrics)
        {
            var report = $@"
Video Analysis Report
====================
Video: {Path.GetFileName(videoPath)}
Sample: {sample.SampleNumber}
Analysis Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}

Sample Parameters:
- Chamber Type: {sample.ChamberType ?? "N/A"}
- Magnification: {sample.Magnification ?? "N/A"}x
- Frame Rate: {sample.FrameRate ?? "N/A"} fps
- Microns per Pixel: {sample.MicronsPerPixel ?? "N/A"} μm/px

Track Analysis:
- Total Tracks: {metrics.TotalTracks}
- Progressive: {metrics.ProgressiveTracks}
- Non-Progressive: {metrics.NonProgressiveTracks}
- Immotile: {metrics.ImmotileTracks}

CASA Metrics:
- Mean VCL: {metrics.MeanVCL:F2} μm/s
- Mean VSL: {metrics.MeanVSL:F2} μm/s
- Mean VAP: {metrics.MeanVAP:F2} μm/s
- Mean ALH: {metrics.MeanALH:F2} μm
- Mean BCF: {metrics.MeanBCF:F2} Hz
- Mean LIN: {metrics.MeanLIN:F2} %
- Mean STR: {metrics.MeanSTR:F2} %
- Mean WOB: {metrics.MeanWOB:F2} %

Analysis completed successfully.
";

            var reportPath = Path.Combine(_outputDirectory, $"Analysis_Report_{DateTime.Now:yyyyMMdd_HHmmss}.txt");
            File.WriteAllText(reportPath, report);
            
            return reportPath;
        }
    }

    public class SpermTrack
    {
        public int TrackId { get; set; }
        public int StartFrame { get; set; }
        public int EndFrame { get; set; }
        public List<PointF> Positions { get; set; } = new List<PointF>();
        public List<double> Areas { get; set; } = new List<double>();
        public PointF Center { get; set; }

        // CASA Metrics
        public double? MeanVCL { get; set; }
        public double? MeanVSL { get; set; }
        public double? MeanVAP { get; set; }
        public double? ALH { get; set; }
        public double? BCF { get; set; }
        public double? LIN { get; set; }
        public double? STR { get; set; }
        public double? WOB { get; set; }

        public int TotalFrames => EndFrame - StartFrame + 1;
        public double? TrackDuration => TotalFrames > 0 ? TotalFrames / 30.0 : null; // Assuming 30 fps
    }

    public class CASAMetrics
    {
        public double MeanVCL { get; set; }
        public double MeanVSL { get; set; }
        public double MeanVAP { get; set; }
        public double MeanALH { get; set; }
        public double MeanBCF { get; set; }
        public double MeanLIN { get; set; }
        public double MeanSTR { get; set; }
        public double MeanWOB { get; set; }
        public int TotalTracks { get; set; }
        public int ProgressiveTracks { get; set; }
        public int NonProgressiveTracks { get; set; }
        public int ImmotileTracks { get; set; }
    }

    public class VideoAnalysisResult
    {
        public string VideoPath { get; set; } = string.Empty;
        public int SampleId { get; set; }
        public int TotalFrames { get; set; }
        public double FrameRate { get; set; }
        public double Duration { get; set; }
        public List<SpermTrack> Tracks { get; set; } = new List<SpermTrack>();
        public CASAMetrics Metrics { get; set; } = new CASAMetrics();
        public string Report { get; set; } = string.Empty;
        public DateTime AnalysisDate { get; set; }
        public bool Success { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
    }

    // Simple console logger for now
    public interface ILogger
    {
        void LogInformation(string message);
        void LogWarning(string message);
        void LogError(string message);
    }

    public class ConsoleLogger : ILogger
    {
        public void LogInformation(string message) => Console.WriteLine($"[INFO] {message}");
        public void LogWarning(string message) => Console.WriteLine($"[WARN] {message}");
        public void LogError(string message) => Console.WriteLine($"[ERROR] {message}");
    }
}