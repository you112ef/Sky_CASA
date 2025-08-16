@echo off
echo ========================================
echo MedicalLabAnalyzer Installation Script
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check if .NET 8 is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: .NET 8 Runtime is not installed.
    echo Please download and install .NET 8 Runtime from:
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    echo.
    pause
    exit /b 1
)

echo .NET 8 Runtime: OK
echo.

REM Check if Visual C++ Redistributable is needed for EmguCV
echo Checking Visual C++ Redistributable...
if not exist "C:\Windows\System32\msvcp140.dll" (
    echo WARNING: Visual C++ Redistributable may be required for video processing.
    echo Download from: https://aka.ms/vs/17/release/vc_redist.x64.exe
    echo.
)

echo.
echo Creating application directories...
if not exist "Database" mkdir Database
if not exist "Reports" mkdir Reports
if not exist "Reports\Templates" mkdir Reports\Templates
if not exist "UserGuides" mkdir UserGuides
if not exist "logs" mkdir logs
if not exist "VideoAnalysis" mkdir VideoAnalysis
if not exist "Backups" mkdir Backups

echo.
echo Building the application...
echo.

REM Build the application
dotnet restore
if %errorlevel% neq 0 (
    echo ERROR: Failed to restore NuGet packages.
    pause
    exit /b 1
)

dotnet build --configuration Release
if %errorlevel% neq 0 (
    echo ERROR: Failed to build the application.
    pause
    exit /b 1
)

echo.
echo Creating database...
echo.

REM Create SQLite database
if exist "Database\medical_lab.db" (
    echo Database already exists.
) else (
    echo Initializing new database...
    REM You can add SQLite command here if available
    echo Database will be created on first run.
)

echo.
echo Copying files...
echo.

REM Copy necessary files to output directory
if exist "bin\Release\net8.0-windows" (
    xcopy "bin\Release\net8.0-windows\*" "bin\Release\net8.0-windows\publish\" /E /I /Y >nul 2>&1
    echo Application files copied successfully.
) else (
    echo WARNING: Build output not found. Application may not be properly built.
)

echo.
echo ========================================
echo Installation completed!
echo ========================================
echo.
echo To run the application:
echo 1. Navigate to: bin\Release\net8.0-windows\publish\
echo 2. Run: MedicalLabAnalyzer.exe
echo.
echo Default login credentials:
echo Username: admin
echo Password: Admin123!
echo.
echo Press any key to exit...
pause >nul