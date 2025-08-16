# 🔧 حل مشاكل البناء - Build Troubleshooting Guide

## 🚨 **المشاكل الشائعة وحلولها**

### 1. **مشكلة التسميات الجديدة للأنظمة الأساسية**

#### **السبب:**
GitHub Actions قام بتحديث تسميات الأنظمة الأساسية:
- `macos-latest` → `macos-15`
- `windows-latest` → `windows-server-2025`
- `linux-latest` → `ubuntu-latest`

#### **الحل:**
```yaml
# في ملف .github/workflows/build-all-platforms.yml
jobs:
  build-windows:
    runs-on: windows-server-2025  # بدلاً من windows-latest
    
  build-macos:
    runs-on: macos-15  # بدلاً من macos-latest
    
  build-linux:
    runs-on: ubuntu-latest  # بدلاً من linux-latest
```

### 2. **مشكلة بناء متعدد المنصات**

#### **السبب:**
عدم تحديد `RuntimeIdentifier` الصحيح لكل منصة.

#### **الحل:**
```bash
# Windows
dotnet publish -r win-x64 --self-contained true

# Linux
dotnet publish -r linux-x64 --self-contained true

# macOS Intel
dotnet publish -r osx-x64 --self-contained true

# macOS ARM64
dotnet publish -r osx-arm64 --self-contained true
```

### 3. **مشكلة الحزم المفقودة**

#### **السبب:**
عدم تثبيت الحزم المطلوبة أو تعارض في الإصدارات.

#### **الحل:**
```bash
# تنظيف الحزم
dotnet nuget locals all --clear

# إعادة تثبيت الحزم
dotnet restore --force

# تحديث الحزم
dotnet list package --outdated
dotnet add package PackageName --version LatestVersion
```

### 4. **مشكلة EmguCV على Linux/macOS**

#### **السبب:**
EmguCV متوفر فقط على Windows.

#### **الحل:**
```xml
<!-- في MedicalLabAnalyzer.csproj -->
<PackageReference Include="Emgu.CV" Version="4.8.1.5350" 
                  Condition="'$(TargetFramework)' == 'net8.0-windows'" />

<PackageReference Include="FFmpeg.AutoGen" Version="6.1.0" 
                  Condition="'$(TargetFramework)' != 'net8.0-windows'" />
```

## 🛠️ **حلول متقدمة**

### 1. **استخدام Docker لتجنب مشاكل البناء**

```dockerfile
# Dockerfile.optimized
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet build -c Release
RUN dotnet publish -c Release -r linux-x64 --self-contained true
```

### 2. **ملفات البناء العالمية**

#### **Directory.Build.props:**
```xml
<PropertyGroup>
  <TargetFramework>net8.0</TargetFramework>
  <LangVersion>latest</LangVersion>
  <Nullable>enable</Nullable>
</PropertyGroup>
```

#### **Directory.Build.targets:**
```xml
<Target Name="PostBuild" AfterTargets="PostBuildEvent">
  <Copy SourceFiles="Database\**\*" 
        DestinationFolder="$(OutputPath)Database" />
</Target>
```

### 3. **سكريبتات البناء المحسنة**

#### **Linux/macOS:**
```bash
#!/bin/bash
# build-all-platforms.sh
set -e  # إيقاف عند حدوث خطأ

echo "🔧 Building for all platforms..."

# Windows
dotnet publish -c Release -r win-x64 --self-contained true \
  -p:PublishSingleFile=true -o builds/windows

# Linux
dotnet publish -c Release -r linux-x64 --self-contained true \
  -p:PublishSingleFile=true -o builds/linux

# macOS
dotnet publish -c Release -r osx-x64 --self-contained true \
  -p:PublishSingleFile=true -o builds/macos

echo "✅ All platforms built successfully!"
```

#### **Windows:**
```batch
@echo off
REM build-windows.bat
echo 🔧 Building for Windows...

dotnet publish -c Release -r win-x64 --self-contained true ^
  -p:PublishSingleFile=true -o builds\windows

if %errorlevel% equ 0 (
    echo ✅ Windows build completed!
) else (
    echo ❌ Windows build failed!
    exit /b 1
)
```

## 🔍 **تشخيص المشاكل**

### 1. **فحص إصدار .NET**
```bash
dotnet --version
dotnet --list-sdks
dotnet --list-runtimes
```

### 2. **فحص الحزم**
```bash
dotnet list package
dotnet list package --outdated
dotnet list package --vulnerable
```

### 3. **فحص التكوين**
```bash
dotnet build --verbosity detailed
dotnet publish --verbosity detailed
```

### 4. **فحص التبعيات**
```bash
dotnet restore --verbosity detailed
dotnet build --no-restore --verbosity detailed
```

## 📋 **قائمة التحقق من البناء**

### **قبل البناء:**
- [ ] تثبيت .NET 8 SDK
- [ ] تثبيت Visual Studio 2022/2023 (للتطوير)
- [ ] تحديث NuGet packages
- [ ] تنظيف الحزم القديمة

### **أثناء البناء:**
- [ ] فحص رسائل الخطأ
- [ ] التأكد من صحة التكوين
- [ ] فحص التبعيات
- [ ] التأكد من صحة المسارات

### **بعد البناء:**
- [ ] فحص الملفات الناتجة
- [ ] اختبار التطبيق
- [ ] فحص الأداء
- [ ] إنشاء حزم التوزيع

## 🚀 **أفضل الممارسات**

### 1. **استخدام CI/CD**
- GitHub Actions للبناء التلقائي
- Azure DevOps للأنظمة المؤسسية
- Jenkins للبيئات المحلية

### 2. **إدارة الإصدارات**
```xml
<PropertyGroup>
  <Version>1.0.0</Version>
  <AssemblyVersion>1.0.0.0</AssemblyVersion>
  <FileVersion>1.0.0.0</FileVersion>
</PropertyGroup>
```

### 3. **التوثيق**
- README.md شامل
- تعليقات في الكود
- دليل المستخدم
- دليل المطور

### 4. **الاختبار**
```bash
dotnet test
dotnet test --collect:"XPlat Code Coverage"
dotnet test --logger:"console;verbosity=detailed"
```

## 📞 **الحصول على المساعدة**

### **المجتمع:**
- GitHub Issues
- Stack Overflow
- .NET Community

### **الوثائق الرسمية:**
- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

### **أدوات التشخيص:**
- Visual Studio Diagnostic Tools
- dotnet-trace
- dotnet-counters
- dotnet-dump

---

## 🎯 **الخلاصة**

لحل مشاكل البناء:

1. **تحديث تسميات GitHub Actions** للأنظمة الجديدة
2. **استخدام Docker** لتجنب مشاكل البيئة
3. **إضافة ملفات البناء العالمية** للتكوين الموحد
4. **تحسين سكريبتات البناء** مع معالجة الأخطاء
5. **استخدام CI/CD** للبناء التلقائي
6. **التوثيق الشامل** للمشروع

*مع هذه الحلول، سيعمل بناء المشروع بسلاسة على جميع المنصات!* 🚀