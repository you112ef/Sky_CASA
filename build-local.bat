@echo off
REM Local Build Script for MedicalLabAnalyzer
REM حل مشاكل البناء المحلي

echo 🔧 MedicalLabAnalyzer - Local Build Script
echo ===========================================

REM Check if .NET is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ .NET SDK not found! Please install .NET 8 SDK
    echo Download from: https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

echo ✅ .NET SDK found: 
dotnet --version

echo.
echo 🧹 Cleaning previous builds...
if exist "bin" rmdir /s /q "bin"
if exist "obj" rmdir /s /q "obj"

echo.
echo 📦 Restoring NuGet packages...
dotnet restore --verbosity normal
if %errorlevel% neq 0 (
    echo ❌ Package restore failed!
    pause
    exit /b 1
)

echo.
echo 🔨 Building project...
dotnet build --configuration Release --no-restore --verbosity normal
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo 🧪 Running tests...
dotnet test --no-build --configuration Release --verbosity normal
if %errorlevel% neq 0 (
    echo ⚠️ Tests failed, but continuing with build...
)

echo.
echo 📤 Publishing for Windows...
dotnet publish -c Release -r win-x64 --self-contained true ^
  -p:PublishSingleFile=true -p:PublishTrimmed=true ^
  -p:DebugType=None -p:DebugSymbols=false ^
  -o publish/windows --verbosity normal

if %errorlevel% equ 0 (
    echo ✅ Windows build completed successfully!
    echo 📁 Output location: publish\windows\
    
    echo.
    echo 📋 Build summary:
    dir publish\windows\ /b
) else (
    echo ❌ Windows build failed!
)

echo.
echo 🎉 Build process completed!
pause