# MedicalLabAnalyzer - تحليل المختبر الطبي

A comprehensive offline desktop application for medical laboratory analysis, patient management, and video analysis (CASA metrics) built with WPF .NET 8.

## 🌟 Features

### 🔐 Authentication & Security
- **Multi-level user roles**: Admin, Doctor, Technician, Viewer
- **Secure password hashing** using PBKDF2 with 150,000 iterations
- **Offline authentication** - no internet required
- **Audit logging** for all system activities

### 👥 Patient Management
- **Complete patient records** with MRN, demographics, medical history
- **Arabic language support** for patient names and notes
- **Patient search and filtering** capabilities
- **Medical record number (MRN) validation**

### 🔬 Exam Management
- **Multiple exam types**: Semen Analysis, Sperm Morphology, Motility Test, Combined
- **Priority levels**: Low, Normal, High, Urgent
- **Status tracking**: In Progress, Completed, Cancelled
- **Clinical notes and results** documentation

### 📹 Video Analysis (CASA)
- **Offline video processing** using EmguCV
- **CASA metrics calculation**:
  - VCL (Curvilinear Velocity)
  - VSL (Straight Line Velocity)
  - VAP (Average Path Velocity)
  - ALH (Amplitude of Lateral Head Displacement)
  - BCF (Beat Cross Frequency)
  - LIN (Linearity)
  - STR (Straightness)
  - WOB (Wobble)
- **Sperm tracking and classification**
- **Real-time analysis reports**

### 📊 Reports Generation
- **Crystal Reports integration** for professional PDF generation
- **Excel export** capabilities
- **Multiple report types**: Preliminary, Final, Summary
- **Customizable templates**
- **Offline report generation**

### 💾 Data Management
- **SQLite database** for reliable local storage
- **Entity Framework Core** for data access
- **Automatic backups** with scheduling options
- **Data import/export** functionality

### 🎨 User Interface
- **Material Design** theme for modern appearance
- **Bilingual support** (English/Arabic)
- **Responsive layout** with navigation sidebar
- **Dark/Light theme** support

## 🚀 Installation

### Prerequisites
- Windows 10/11 (64-bit)
- .NET 8.0 Runtime
- Visual Studio 2022/2023 (for development)

### Quick Start
1. **Download** the latest release from GitHub
2. **Extract** the ZIP file to your desired location
3. **Run** `MedicalLabAnalyzer.exe`
4. **Login** with default credentials:
   - Username: `admin`
   - Password: `Admin123!`

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/MedicalLabAnalyzer.git
cd MedicalLabAnalyzer

# Restore NuGet packages
dotnet restore

# Build the solution
dotnet build

# Run the application
dotnet run
```

## 📁 Project Structure

```
MedicalLabAnalyzer/
├── src/                          # Source code
│   ├── Data/                     # Data access layer
│   │   ├── Entities/            # Entity models
│   │   └── MedicalLabContext.cs # EF Core context
│   ├── ViewModels/              # MVVM view models
│   ├── Views/                   # WPF user controls
│   ├── Services/                # Business logic services
│   ├── Common/                  # Shared utilities
│   └── VideoAnalysis/          # Video processing
├── Database/                     # Database files
│   └── create_medical_lab_schema.sql
├── Reports/                      # Report templates
│   └── Templates/
├── UserGuides/                   # User documentation
└── packages/                     # NuGet packages
```

## 🗄️ Database Schema

The application uses SQLite with the following main tables:

- **Users**: Authentication and user management
- **Patients**: Patient information and demographics
- **Exams**: Examination records and status
- **Samples**: Sample collection and parameters
- **Videos**: Video file management
- **Tracks**: CASA analysis results
- **Morphology**: Sperm morphology analysis
- **Reports**: Generated report files
- **AuditLog**: System activity tracking
- **Backups**: Backup management

## 🔧 Configuration

### Database Connection
The application automatically creates and configures the SQLite database in the `Database/` folder.

### Video Analysis Settings
- **Frame rate**: Configurable per sample
- **Magnification**: Microscope magnification settings
- **Microns per pixel**: Calibration for measurements
- **Chamber type**: Makler, Neubauer, MicroCell, or custom

### Backup Configuration
- **Automatic backups**: Daily, weekly, or monthly
- **Backup location**: Configurable local or network path
- **Retention policy**: Configurable backup retention

## 📖 Usage Guide

### 1. User Authentication
1. Launch the application
2. Enter your username and password
3. Select your role and department
4. Click "Login"

### 2. Patient Management
1. Navigate to "Patients" section
2. Click "Add New Patient" to create patient records
3. Enter patient demographics and medical history
4. Save and manage patient information

### 3. Creating Exams
1. Go to "Exams" section
2. Select a patient for examination
3. Choose exam type and priority
4. Add clinical notes and observations
5. Save exam details

### 4. Video Analysis
1. Navigate to "Video Analysis"
2. Upload video files (MP4, AVI, MOV supported)
3. Configure analysis parameters
4. Run CASA analysis
5. Review results and generate reports

### 5. Report Generation
1. Select completed exams
2. Choose report template
3. Generate PDF or Excel reports
4. Print or save reports locally

## 🔒 Security Features

- **Password Policy**: Minimum 8 characters with complexity requirements
- **Session Management**: Secure session handling
- **Access Control**: Role-based permissions
- **Audit Trail**: Complete activity logging
- **Data Encryption**: Sensitive data encryption at rest

## 🌐 Offline Capabilities

The application is designed to work completely offline:

- **Local Database**: SQLite database for data storage
- **Offline Video Processing**: EmguCV for video analysis
- **Local Report Generation**: Crystal Reports runtime
- **Local Backups**: File system backup management
- **No Internet Required**: All functionality works offline

## 📊 Performance

- **Video Processing**: Optimized for medical video analysis
- **Database Performance**: Indexed queries for fast data retrieval
- **Memory Management**: Efficient resource utilization
- **Multi-threading**: Background processing for video analysis

## 🛠️ Development

### Technology Stack
- **Frontend**: WPF with Material Design
- **Backend**: .NET 8 with C#
- **Database**: SQLite with Entity Framework Core
- **Video Processing**: EmguCV (OpenCV for .NET)
- **Reporting**: Crystal Reports
- **Architecture**: MVVM pattern with dependency injection

### Building from Source
```bash
# Install .NET 8 SDK
# Install Visual Studio 2022/2023

# Clone and build
git clone https://github.com/yourusername/MedicalLabAnalyzer.git
cd MedicalLabAnalyzer
dotnet restore
dotnet build --configuration Release
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: Check the `UserGuides/` folder
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions
- **Email**: support@medicallabanalyzer.com

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core functionality
- Patient and exam management
- Video analysis with CASA metrics
- Report generation
- Offline operation

### Planned Features
- Deep learning integration for advanced analysis
- Cloud backup and synchronization
- Multi-language support expansion
- Mobile companion app
- API for third-party integrations

## 🙏 Acknowledgments

- **OpenCV Community** for computer vision algorithms
- **Material Design** team for UI components
- **SQLite** developers for reliable database engine
- **Medical professionals** for domain expertise

## 📞 Contact

- **Project Lead**: [Your Name]
- **Email**: contact@medicallabanalyzer.com
- **Website**: https://medicallabanalyzer.com
- **GitHub**: https://github.com/yourusername/MedicalLabAnalyzer

---

**MedicalLabAnalyzer** - Professional medical laboratory analysis software for offline operation.

*Built with ❤️ for the medical community*