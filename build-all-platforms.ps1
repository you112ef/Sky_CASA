# PowerShell Script for Building MedicalLabAnalyzer on All Platforms
# سكريبت PowerShell لبناء MedicalLabAnalyzer على جميع الأنظمة الأساسية

param(
    [switch]$Windows,
    [switch]$Linux,
    [switch]$macOS,
    [switch]$All,
    [switch]$Docker,
    [switch]$Clean,
    [switch]$Help
)

# Function to display help
function Show-Help {
    Write-Host "MedicalLabAnalyzer - Multi-Platform Build Script" -ForegroundColor Cyan
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Available parameters:" -ForegroundColor Yellow
    Write-Host "  -Windows     - Build for Windows only" -ForegroundColor White
    Write-Host "  -Linux       - Build for Linux only" -ForegroundColor White
    Write-Host "  -macOS       - Build for macOS only" -ForegroundColor White
    Write-Host "  -All         - Build for all platforms" -ForegroundColor White
    Write-Host "  -Docker      - Build Docker image" -ForegroundColor White
    Write-Host "  -Clean       - Clean build artifacts" -ForegroundColor White
    Write-Host "  -Help        - Show this help message" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\build-all-platforms.ps1 -All" -ForegroundColor White
    Write-Host "  .\build-all-platforms.ps1 -Windows" -ForegroundColor White
    Write-Host "  .\build-all-platforms.ps1 -Linux -macOS" -ForegroundColor White
}

# Function to create build directories
function Create-BuildDirectories {
    Write-Host "📁 Creating build directories..." -ForegroundColor Green
    
    $directories = @(
        "builds",
        "builds\windows",
        "builds\linux", 
        "builds\macos",
        "builds\macos-arm64"
    )
    
    foreach ($dir in $directories) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
    }
    
    Write-Host "✅ Build directories created" -ForegroundColor Green
}

# Function to clean build artifacts
function Clean-BuildArtifacts {
    Write-Host "🧹 Cleaning build artifacts..." -ForegroundColor Yellow
    
    $paths = @("bin", "obj", "builds", "publish")
    
    foreach ($path in $paths) {
        if (Test-Path $path) {
            Remove-Item -Path $path -Recurse -Force
            Write-Host "  Removed: $path" -ForegroundColor Gray
        }
    }
    
    Write-Host "✅ Clean completed" -ForegroundColor Green
}

# Function to restore NuGet packages
function Restore-Packages {
    Write-Host "📦 Restoring NuGet packages..." -ForegroundColor Green
    dotnet restore
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Packages restored successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to restore packages" -ForegroundColor Red
        exit 1
    }
}

# Function to build for Windows
function Build-Windows {
    Write-Host "🪟 Building for Windows x64..." -ForegroundColor Cyan
    
    dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds\windows
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Windows build completed" -ForegroundColor Green
        
        # Copy shared files
        Write-Host "📁 Copying shared files..." -ForegroundColor Gray
        Copy-Item -Path "Database" -Destination "builds\windows\" -Recurse -Force
        Copy-Item -Path "Reports" -Destination "builds\windows\" -Recurse -Force
        Copy-Item -Path "UserGuides" -Destination "builds\windows\" -Recurse -Force
        
        # Create ZIP file
        Write-Host "📦 Creating Windows ZIP..." -ForegroundColor Gray
        Compress-Archive -Path "builds\windows\*" -DestinationPath "builds\MedicalLabAnalyzer-Windows-x64.zip" -Force
        
        Write-Host "✅ Windows package created: builds\MedicalLabAnalyzer-Windows-x64.zip" -ForegroundColor Green
    } else {
        Write-Host "❌ Windows build failed" -ForegroundColor Red
        exit 1
    }
}

# Function to build for Linux
function Build-Linux {
    Write-Host "🐧 Building for Linux x64..." -ForegroundColor Cyan
    
    dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds\linux
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Linux build completed" -ForegroundColor Green
        
        # Copy shared files
        Write-Host "📁 Copying shared files..." -ForegroundColor Gray
        Copy-Item -Path "Database" -Destination "builds\linux\" -Recurse -Force
        Copy-Item -Path "Reports" -Destination "builds\linux\" -Recurse -Force
        Copy-Item -Path "UserGuides" -Destination "builds\linux\" -Recurse -Force
        
        Write-Host "✅ Linux package ready: builds\linux\" -ForegroundColor Green
    } else {
        Write-Host "❌ Linux build failed" -ForegroundColor Red
        exit 1
    }
}

# Function to build for macOS
function Build-macOS {
    Write-Host "🍎 Building for macOS..." -ForegroundColor Cyan
    
    # Build for Intel
    Write-Host "  Building for macOS x64..." -ForegroundColor Gray
    dotnet publish -c Release -r osx-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds\macos
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ macOS x64 build completed" -ForegroundColor Green
    } else {
        Write-Host "❌ macOS x64 build failed" -ForegroundColor Red
        exit 1
    }
    
    # Build for ARM64
    Write-Host "  Building for macOS ARM64..." -ForegroundColor Gray
    dotnet publish -c Release -r osx-arm64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds\macos-arm64
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ macOS ARM64 build completed" -ForegroundColor Green
    } else {
        Write-Host "❌ macOS ARM64 build failed" -ForegroundColor Red
        exit 1
    }
    
    # Copy shared files
    Write-Host "📁 Copying shared files..." -ForegroundColor Gray
    Copy-Item -Path "Database" -Destination "builds\macos\" -Recurse -Force
    Copy-Item -Path "Reports" -Destination "builds\macos\" -Recurse -Force
    Copy-Item -Path "UserGuides" -Destination "builds\macos\" -Recurse -Force
    
    Copy-Item -Path "Database" -Destination "builds\macos-arm64\" -Recurse -Force
    Copy-Item -Path "Reports" -Destination "builds\macos-arm64\" -Recurse -Force
    Copy-Item -Path "UserGuides" -Destination "builds\macos-arm64\" -Recurse -Force
    
    Write-Host "✅ macOS packages ready" -ForegroundColor Green
}

# Function to build Docker image
function Build-Docker {
    Write-Host "🐳 Building Docker image..." -ForegroundColor Cyan
    
    if (Get-Command docker -ErrorAction SilentlyContinue) {
        docker build -t medicallab-analyzer:latest .
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Docker image built successfully" -ForegroundColor Green
        } else {
            Write-Host "❌ Docker build failed" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️ Docker not found. Please install Docker Desktop." -ForegroundColor Yellow
    }
}

# Function to show build summary
function Show-BuildSummary {
    Write-Host ""
    Write-Host "🎉 Build Process Summary" -ForegroundColor Cyan
    Write-Host "========================" -ForegroundColor Cyan
    Write-Host ""
    
    if (Test-Path "builds\MedicalLabAnalyzer-Windows-x64.zip") {
        Write-Host "✅ Windows: builds\MedicalLabAnalyzer-Windows-x64.zip" -ForegroundColor Green
    }
    
    if (Test-Path "builds\linux") {
        Write-Host "✅ Linux: builds\linux\" -ForegroundColor Green
    }
    
    if (Test-Path "builds\macos") {
        Write-Host "✅ macOS x64: builds\macos\" -ForegroundColor Green
    }
    
    if (Test-Path "builds\macos-arm64") {
        Write-Host "✅ macOS ARM64: builds\macos-arm64\" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "📋 Installation Instructions:" -ForegroundColor Yellow
    Write-Host "  🪟 Windows: Extract ZIP and run MedicalLabAnalyzer.exe" -ForegroundColor White
    Write-Host "  🐧 Linux: Copy files and run ./MedicalLabAnalyzer" -ForegroundColor White
    Write-Host "  🍎 macOS: Copy files and run ./MedicalLabAnalyzer" -ForegroundColor White
    Write-Host ""
    Write-Host "🔑 Default Login:" -ForegroundColor Yellow
    Write-Host "  Username: admin" -ForegroundColor White
    Write-Host "  Password: Admin123!" -ForegroundColor White
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

if ($Clean) {
    Clean-BuildArtifacts
    exit 0
}

# Check if .NET is installed
if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "❌ .NET 8 SDK not found!" -ForegroundColor Red
    Write-Host "Please install .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔧 MedicalLabAnalyzer Build Script Started" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Create build directories
Create-BuildDirectories

# Restore packages
Restore-Packages

# Build based on parameters
if ($All -or $Windows) {
    Build-Windows
}

if ($All -or $Linux) {
    Build-Linux
}

if ($All -or $macOS) {
    Build-macOS
}

if ($Docker) {
    Build-Docker
}

# Show summary
Show-BuildSummary

Write-Host ""
Write-Host "🎯 Build process completed successfully!" -ForegroundColor Green