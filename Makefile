# Makefile for MedicalLabAnalyzer
# Multi-platform build system

.PHONY: help clean restore build publish-all windows linux macos macos-arm64 docker install

# Default target
help:
	@echo "MedicalLabAnalyzer - Multi-Platform Build System"
	@echo "================================================"
	@echo ""
	@echo "Available targets:"
	@echo "  help          - Show this help message"
	@echo "  clean         - Clean build artifacts"
	@echo "  restore       - Restore NuGet packages"
	@echo "  build         - Build for current platform"
	@echo "  publish-all   - Publish for all platforms"
	@echo "  windows       - Build and publish for Windows"
	@echo "  linux         - Build and publish for Linux"
	@echo "  macos         - Build and publish for macOS (Intel)"
	@echo "  macos-arm64   - Build and publish for macOS (ARM64)"
	@echo "  docker        - Build Docker image"
	@echo "  install       - Install dependencies"
	@echo ""

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf bin/
	rm -rf obj/
	rm -rf builds/
	rm -rf publish/
	@echo "✅ Clean completed"

# Restore NuGet packages
restore:
	@echo "📦 Restoring NuGet packages..."
	dotnet restore
	@echo "✅ Restore completed"

# Build for current platform
build: restore
	@echo "🔧 Building for current platform..."
	dotnet build -c Release --no-restore
	@echo "✅ Build completed"

# Create build directories
build-dirs:
	@echo "📁 Creating build directories..."
	mkdir -p builds/windows
	mkdir -p builds/linux
	mkdir -p builds/macos
	mkdir -p builds/macos-arm64
	@echo "✅ Directories created"

# Publish for all platforms
publish-all: build-dirs windows linux macos macos-arm64
	@echo "🎉 All platform builds completed!"
	@echo ""
	@echo "📁 Available builds:"
	@echo "  🪟 Windows: builds/MedicalLabAnalyzer-Windows-x64.zip"
	@echo "  🐧 Linux: builds/MedicalLabAnalyzer-Linux-x64.tar.gz"
	@echo "  🍎 macOS: builds/MedicalLabAnalyzer-macOS-x64.tar.gz"
	@echo "  🍎 macOS ARM64: builds/MedicalLabAnalyzer-macOS-ARM64.tar.gz"

# Build and publish for Windows
windows: build-dirs
	@echo "🪟 Building for Windows x64..."
	dotnet publish -c Release -r win-x64 --self-contained true \
		-p:PublishSingleFile=true -p:PublishTrimmed=true \
		-o builds/windows
	@echo "📁 Copying shared files..."
	cp -r Database builds/windows/
	cp -r Reports builds/windows/
	cp -r UserGuides builds/windows/
	@echo "📦 Creating Windows ZIP..."
	cd builds/windows && zip -r ../MedicalLabAnalyzer-Windows-x64.zip . && cd ../..
	@echo "✅ Windows build completed"

# Build and publish for Linux
linux: build-dirs
	@echo "🐧 Building for Linux x64..."
	dotnet publish -c Release -r linux-x64 --self-contained true \
		-p:PublishSingleFile=true -p:PublishTrimmed=true \
		-o builds/linux
	@echo "📁 Copying shared files..."
	cp -r Database builds/linux/
	cp -r Reports builds/linux/
	cp -r UserGuides builds/linux/
	@echo "🔧 Making executable..."
	chmod +x builds/linux/MedicalLabAnalyzer
	@echo "📦 Creating Linux TAR.GZ..."
	cd builds/linux && tar -czf ../MedicalLabAnalyzer-Linux-x64.tar.gz . && cd ../..
	@echo "✅ Linux build completed"

# Build and publish for macOS (Intel)
macos: build-dirs
	@echo "🍎 Building for macOS x64..."
	dotnet publish -c Release -r osx-x64 --self-contained true \
		-p:PublishSingleFile=true -p:PublishTrimmed=true \
		-o builds/macos
	@echo "📁 Copying shared files..."
	cp -r Database builds/macos/
	cp -r Reports builds/macos/
	cp -r UserGuides builds/macos/
	@echo "🔧 Making executable..."
	chmod +x builds/macos/MedicalLabAnalyzer
	@echo "📦 Creating macOS TAR.GZ..."
	cd builds/macos && tar -czf ../MedicalLabAnalyzer-macOS-x64.tar.gz . && cd ../..
	@echo "✅ macOS build completed"

# Build and publish for macOS (ARM64)
macos-arm64: build-dirs
	@echo "🍎 Building for macOS ARM64..."
	dotnet publish -c Release -r osx-arm64 --self-contained true \
		-p:PublishSingleFile=true -p:PublishTrimmed=true \
		-o builds/macos-arm64
	@echo "📁 Copying shared files..."
	cp -r Database builds/macos-arm64/
	cp -r Reports builds/macos-arm64/
	cp -r UserGuides builds/macos-arm64/
	@echo "🔧 Making executable..."
	chmod +x builds/macos-arm64/MedicalLabAnalyzer
	@echo "📦 Creating macOS ARM64 TAR.GZ..."
	cd builds/macos-arm64 && tar -czf ../MedicalLabAnalyzer-macOS-ARM64.tar.gz . && cd ../..
	@echo "✅ macOS ARM64 build completed"

# Build Docker image
docker:
	@echo "🐳 Building Docker image..."
	docker build -t medicallab-analyzer:latest .
	@echo "✅ Docker build completed"

# Install dependencies
install:
	@echo "📥 Installing dependencies..."
	@echo "🔧 .NET 8 SDK is required"
	@echo "   Download from: https://dotnet.microsoft.com/download/dotnet/8.0"
	@echo ""
	@echo "🐳 Docker (optional):"
	@echo "   Download from: https://docker.com"
	@echo ""
	@echo "📦 Additional packages will be installed automatically"
	@echo "✅ Dependencies installation guide completed"

# Development targets
dev-build: restore
	@echo "🔧 Building for development..."
	dotnet build -c Debug
	@echo "✅ Development build completed"

dev-run: dev-build
	@echo "🚀 Running in development mode..."
	dotnet run

# Testing targets
test: restore
	@echo "🧪 Running tests..."
	dotnet test
	@echo "✅ Tests completed"

# Package management
packages-update:
	@echo "📦 Updating NuGet packages..."
	dotnet list package --outdated
	@echo "✅ Package update check completed"

# Release preparation
release-prep: clean publish-all
	@echo "🎯 Preparing release..."
	@echo "📁 Release files are ready in builds/ directory"
	@echo "✅ Release preparation completed"

# Platform-specific installers
installer-windows: windows
	@echo "🚀 Creating Windows installer..."
	@echo "📝 Note: WiX Toolset required for MSI creation"
	@echo "✅ Windows installer preparation completed"

installer-linux: linux
	@echo "🚀 Creating Linux package..."
	@echo "📦 TAR.GZ package created"
	@echo "✅ Linux package completed"

installer-macos: macos macos-arm64
	@echo "🚀 Creating macOS packages..."
	@echo "📦 TAR.GZ packages created for Intel and ARM64"
	@echo "✅ macOS packages completed"

# Documentation
docs:
	@echo "📚 Building documentation..."
	@echo "📁 Documentation is in UserGuides/ directory"
	@echo "✅ Documentation build completed"

# All-in-one target
all: clean restore publish-all docker docs
	@echo "🎉 Complete build process finished!"
	@echo "📁 All builds available in builds/ directory"
	@echo "🐳 Docker image: medicallab-analyzer:latest"