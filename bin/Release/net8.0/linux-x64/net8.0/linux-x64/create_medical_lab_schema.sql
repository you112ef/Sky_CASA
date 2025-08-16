PRAGMA foreign_keys = ON;

-- Users table for authentication and role management
CREATE TABLE Users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL UNIQUE,
    PasswordHash BLOB NOT NULL,
    PasswordSalt BLOB NOT NULL,
    Role TEXT NOT NULL CHECK (Role IN ('Admin', 'Technician', 'Doctor', 'Viewer')),
    FullName TEXT NOT NULL,
    Email TEXT,
    IsActive INTEGER DEFAULT 1,
    LastLoginAt TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    UpdatedAt TEXT DEFAULT (datetime('now'))
);

-- Patients table for patient information
CREATE TABLE Patients (
    PatientId INTEGER PRIMARY KEY AUTOINCREMENT,
    MRN TEXT UNIQUE NOT NULL,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    DOB TEXT,
    Gender TEXT CHECK (Gender IN ('Male', 'Female', 'Other')),
    Phone TEXT,
    Email TEXT,
    Address TEXT,
    MedicalHistory TEXT,
    Notes TEXT,
    IsActive INTEGER DEFAULT 1,
    CreatedAt TEXT DEFAULT (datetime('now')),
    UpdatedAt TEXT DEFAULT (datetime('now'))
);

-- Exams table for examination records
CREATE TABLE Exams (
    ExamId INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientId INTEGER NOT NULL,
    ExamDate TEXT DEFAULT (datetime('now')),
    ExamType TEXT NOT NULL CHECK (ExamType IN ('Semen Analysis', 'Sperm Morphology', 'Motility Test', 'Combined')),
    TechnicianId INTEGER,
    DoctorId INTEGER,
    Status TEXT DEFAULT 'In Progress' CHECK (Status IN ('In Progress', 'Completed', 'Cancelled')),
    Priority TEXT DEFAULT 'Normal' CHECK (Priority IN ('Low', 'Normal', 'High', 'Urgent')),
    ClinicalNotes TEXT,
    Results TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    UpdatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (PatientId) REFERENCES Patients(PatientId),
    FOREIGN KEY (TechnicianId) REFERENCES Users(UserId),
    FOREIGN KEY (DoctorId) REFERENCES Users(UserId)
);

-- Samples table for sample information
CREATE TABLE Samples (
    SampleId INTEGER PRIMARY KEY AUTOINCREMENT,
    ExamId INTEGER NOT NULL,
    SampleNumber TEXT UNIQUE NOT NULL,
    CollectionDate TEXT DEFAULT (datetime('now')),
    CollectionTime TEXT,
    ChamberType TEXT CHECK (ChamberType IN ('Makler', 'Neubauer', 'MicroCell', 'Other')),
    Dilution REAL,
    Magnification INTEGER,
    FrameRate INTEGER,
    MicronsPerPixel REAL,
    Temperature REAL,
    pH REAL,
    Viscosity TEXT,
    Color TEXT,
    Volume REAL,
    LiquefactionTime INTEGER,
    SampleQuality TEXT CHECK (SampleQuality IN ('Excellent', 'Good', 'Fair', 'Poor')),
    Notes TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (ExamId) REFERENCES Exams(ExamId)
);

-- Videos table for video file management
CREATE TABLE Videos (
    VideoId INTEGER PRIMARY KEY AUTOINCREMENT,
    SampleId INTEGER NOT NULL,
    FileName TEXT NOT NULL,
    Path TEXT NOT NULL,
    FileSize INTEGER,
    Duration REAL,
    Resolution TEXT,
    FrameCount INTEGER,
    Codec TEXT,
    BitRate INTEGER,
    UploadDate TEXT DEFAULT (datetime('now')),
    ProcessingStatus TEXT DEFAULT 'Pending' CHECK (ProcessingStatus IN ('Pending', 'Processing', 'Completed', 'Failed')),
    ProcessingDate TEXT,
    ErrorMessage TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (SampleId) REFERENCES Samples(SampleId)
);

-- Tracks table for CASA motility analysis results
CREATE TABLE Tracks (
    TrackId INTEGER PRIMARY KEY AUTOINCREMENT,
    VideoId INTEGER NOT NULL,
    TrackNumber INTEGER NOT NULL,
    StartFrame INTEGER,
    EndFrame INTEGER,
    TotalFrames INTEGER,
    MeanVCL REAL, -- Curvilinear Velocity
    MeanVSL REAL, -- Straight Line Velocity
    MeanVAP REAL, -- Average Path Velocity
    ALH REAL,     -- Amplitude of Lateral Head Displacement
    BCF REAL,     -- Beat Cross Frequency
    LIN REAL,     -- Linearity
    STR REAL,     -- Straightness
    WOB REAL,     -- Wobble
    MAD REAL,     -- Mean Angular Displacement
    Progressivity REAL,
    Classification TEXT CHECK (Classification IN ('Progressive', 'Non-Progressive', 'Immotile')),
    TrackQuality REAL,
    Notes TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (VideoId) REFERENCES Videos(VideoId)
);

-- Morphology table for sperm morphology analysis
CREATE TABLE Morphology (
    MorphId INTEGER PRIMARY KEY AUTOINCREMENT,
    SampleId INTEGER NOT NULL,
    SpermCount INTEGER,
    NormalCount INTEGER,
    AbnormalCount INTEGER,
    HeadAbnormalCount INTEGER,
    MidpieceAbnormalCount INTEGER,
    TailAbnormalCount INTEGER,
    HeadArea REAL,
    HeadPerimeter REAL,
    HeadLength REAL,
    HeadWidth REAL,
    MidpieceLength REAL,
    TailLength REAL,
    TotalLength REAL,
    NormalPercentage REAL,
    AbnormalPercentage REAL,
    HeadAbnormalPercentage REAL,
    MidpieceAbnormalPercentage REAL,
    TailAbnormalPercentage REAL,
    Notes TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (SampleId) REFERENCES Samples(SampleId)
);

-- Reports table for generated reports
CREATE TABLE Reports (
    ReportId INTEGER PRIMARY KEY AUTOINCREMENT,
    ExamId INTEGER NOT NULL,
    ReportType TEXT NOT NULL CHECK (ReportType IN ('Preliminary', 'Final', 'Summary')),
    ReportNumber TEXT UNIQUE NOT NULL,
    PdfPath TEXT,
    ExcelPath TEXT,
    GeneratedBy INTEGER,
    GeneratedAt TEXT DEFAULT (datetime('now')),
    Status TEXT DEFAULT 'Draft' CHECK (Status IN ('Draft', 'Final', 'Approved', 'Printed')),
    ApprovalDate TEXT,
    ApprovedBy INTEGER,
    Notes TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (ExamId) REFERENCES Exams(ExamId),
    FOREIGN KEY (GeneratedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ApprovedBy) REFERENCES Users(UserId)
);

-- AuditLog table for system audit trail
CREATE TABLE AuditLog (
    LogId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    Action TEXT NOT NULL,
    TargetType TEXT NOT NULL,
    TargetId INTEGER,
    OldValues TEXT,
    NewValues TEXT,
    IpAddress TEXT,
    UserAgent TEXT,
    CreatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Backup table for backup management
CREATE TABLE Backups (
    BackupId INTEGER PRIMARY KEY AUTOINCREMENT,
    BackupName TEXT NOT NULL,
    FilePath TEXT NOT NULL,
    FileSize INTEGER,
    BackupType TEXT CHECK (BackupType IN ('Manual', 'Automatic', 'Scheduled')),
    Status TEXT DEFAULT 'In Progress' CHECK (Status IN ('In Progress', 'Completed', 'Failed')),
    CreatedBy INTEGER,
    CreatedAt TEXT DEFAULT (datetime('now')),
    CompletedAt TEXT,
    ErrorMessage TEXT,
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);

-- Create indexes for better performance
CREATE INDEX idx_patients_mrn ON Patients(MRN);
CREATE INDEX idx_patients_name ON Patients(LastName, FirstName);
CREATE INDEX idx_exams_patient ON Exams(PatientId);
CREATE INDEX idx_exams_date ON Exams(ExamDate);
CREATE INDEX idx_samples_exam ON Samples(ExamId);
CREATE INDEX idx_videos_sample ON Videos(SampleId);
CREATE INDEX idx_tracks_video ON Tracks(VideoId);
CREATE INDEX idx_morphology_sample ON Morphology(SampleId);
CREATE INDEX idx_reports_exam ON Reports(ExamId);
CREATE INDEX idx_auditlog_user ON AuditLog(UserId);
CREATE INDEX idx_auditlog_date ON AuditLog(CreatedAt);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_users_updated_at AFTER UPDATE ON Users
BEGIN
    UPDATE Users SET UpdatedAt = datetime('now') WHERE UserId = NEW.UserId;
END;

CREATE TRIGGER update_patients_updated_at AFTER UPDATE ON Patients
BEGIN
    UPDATE Patients SET UpdatedAt = datetime('now') WHERE PatientId = NEW.PatientId;
END;

CREATE TRIGGER update_exams_updated_at AFTER UPDATE ON Exams
BEGIN
    UPDATE Exams SET UpdatedAt = datetime('now') WHERE ExamId = NEW.ExamId;
END;

-- Insert default admin user (password: Admin123!)
INSERT INTO Users (Username, PasswordHash, PasswordSalt, Role, FullName, Email, IsActive)
VALUES ('admin', 
        X'8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918',
        X'8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918',
        'Admin', 
        'System Administrator', 
        'admin@medicallab.com', 
        1);