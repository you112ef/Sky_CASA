#!/bin/bash
# Local Build Script for MedicalLabAnalyzer
# حل مشاكل البناء المحلي

set -e  # إيقاف عند حدوث خطأ

echo "🔧 MedicalLabAnalyzer - Local Build Script"
echo "=========================================="

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
dotnet restore --verbosity normal

echo ""
echo "🔨 Building project..."
dotnet build --configuration Release --no-restore --verbosity normal

echo ""
echo "🧪 Running tests..."
dotnet test --no-build --configuration Release --verbosity normal || echo "⚠️ Tests failed, but continuing with build..."

echo ""
echo "📤 Publishing for current platform..."

# Detect platform
PLATFORM=""
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux-x64"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ $(uname -m) == "arm64" ]]; then
        PLATFORM="osx-arm64"
    else
        PLATFORM="osx-x64"
    fi
else
    echo "⚠️ Unknown platform, using linux-x64"
    PLATFORM="linux-x64"
fi

echo "🌍 Detected platform: $PLATFORM"

dotnet publish -c Release -r $PLATFORM --self-contained true \
  -p:PublishSingleFile=true -p:PublishTrimmed=true \
  -p:DebugType=None -p:DebugSymbols=false \
  -o publish/$PLATFORM --verbosity normal

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Output location: publish/$PLATFORM/"
    
    echo ""
    echo "📋 Build summary:"
    ls -la publish/$PLATFORM/
    
    # Make executable on Unix systems
    if [[ "$OSTYPE" != "msys" ]] && [[ "$OSTYPE" != "cygwin" ]]; then
        chmod +x publish/$PLATFORM/MedicalLabAnalyzer
        echo "🔒 Made executable: publish/$PLATFORM/MedicalLabAnalyzer"
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 Build process completed!"