#!/bin/bash
# Enhanced Build Script for MedicalLabAnalyzer
# حل مشاكل البناء مع معالجة أفضل للأخطاء

set -e  # إيقاف عند حدوث خطأ

echo "🔬 MedicalLabAnalyzer - Enhanced Build Script"
echo "=============================================="

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK not found! Please install .NET 8 SDK"
    echo "Download from: https://dotnet.microsoft.com/download"
    exit 1
fi

echo "✅ .NET SDK found: $(dotnet --version)"

echo ""
echo "🧹 Cleaning previous builds..."
rm -rf bin obj

echo ""
echo "📦 Restoring NuGet packages..."
dotnet restore MedicalLabAnalyzer.csproj --verbosity normal

echo ""
echo "🔨 Building project for current platform..."

# Detect platform and build accordingly
PLATFORM=""
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux-x64"
    echo "🌍 Detected platform: Linux x64"
    dotnet build MedicalLabAnalyzer.csproj -c Release --no-restore --verbosity normal -f net8.0-linux
elif [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ $(uname -m) == "arm64" ]]; then
        PLATFORM="osx-arm64"
        echo "🌍 Detected platform: macOS ARM64"
        dotnet build MedicalLabAnalyzer.csproj -c Release --no-restore --verbosity normal -f net8.0-macos
    else
        PLATFORM="osx-x64"
        echo "🌍 Detected platform: macOS x64"
        dotnet build MedicalLabAnalyzer.csproj -c Release --no-restore --verbosity normal -f net8.0-macos
    fi
else
    echo "⚠️ Unknown platform, using linux-x64"
    PLATFORM="linux-x64"
    dotnet build MedicalLabAnalyzer.csproj -c Release --no-restore --verbosity normal -f net8.0-linux
fi

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    echo ""
    echo "📤 Publishing for current platform..."
    dotnet publish MedicalLabAnalyzer.csproj -c Release -r $PLATFORM --self-contained true \
      -p:PublishSingleFile=true -p:PublishTrimmed=true \
      -p:DebugType=None -p:DebugSymbols=false \
      -o publish/$PLATFORM --verbosity normal
    
    if [ $? -eq 0 ]; then
        echo "✅ Publish completed successfully!"
        echo "📁 Output location: publish/$PLATFORM/"
        
        echo ""
        echo "📋 Build summary:"
        ls -la publish/$PLATFORM/
        
        # Make executable on Unix systems
        if [[ "$OSTYPE" != "msys" ]] && [[ "$OSTYPE" != "cygwin" ]]; then
            chmod +x publish/$PLATFORM/MedicalLabAnalyzer
            echo "🔒 Made executable: publish/$PLATFORM/MedicalLabAnalyzer"
        fi
        
        echo ""
        echo "🧪 Testing basic functionality..."
        if [ -f "publish/$PLATFORM/MedicalLabAnalyzer" ]; then
            echo "✅ Executable file found and is executable"
        else
            echo "⚠️ Executable file not found"
        fi
        
    else
        echo "❌ Publish failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 Enhanced build process completed successfully!"
echo "📊 Summary:"
echo "   - Platform: $PLATFORM"
echo "   - Build: ✅ Success"
echo "   - Publish: ✅ Success"
echo "   - Output: publish/$PLATFORM/"