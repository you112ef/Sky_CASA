using System;

namespace MedicalLabAnalyzer.Models
{
    public class PatientModel
    {
        public int PatientId { get; set; }
        public string MRN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DOB { get; set; }
        public string Gender { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}