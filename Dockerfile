# Dockerfile for MedicalLabAnalyzer
# Multi-stage build for cross-platform compilation

# Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /src

# Copy project files
COPY MedicalLabAnalyzer.csproj ./
COPY Database/ ./Database/
COPY UserGuides/ ./UserGuides/

# Restore dependencies
RUN dotnet restore

# Copy source code
COPY src/ ./src/

# Build for multiple platforms
RUN dotnet build -c Release --no-restore

# Publish for Linux
RUN dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o /app/linux

# Publish for Windows
RUN dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o /app/windows

# Publish for macOS
RUN dotnet publish -c Release -r osx-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o /app/macos

# Stage 2: Runtime stage
FROM mcr.microsoft.com/dotnet/runtime:8.0

# Install required packages for video processing
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgdiplus \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy published applications
COPY --from=build /app/linux ./linux
COPY --from=build /app/windows ./windows
COPY --from=build /app/macos ./macos

# Make Linux version executable
RUN chmod +x ./linux/MedicalLabAnalyzer

# Set environment variables
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Expose port (if needed for web interface)
EXPOSE 8080

# Default command
CMD ["./linux/MedicalLabAnalyzer"]