#!/bin/bash

echo "=========================================="
echo "MedicalLabAnalyzer - بناء لجميع الأنظمة"
echo "=========================================="
echo

# إنشاء مجلدات البناء
mkdir -p builds
mkdir -p builds/windows
mkdir -p builds/linux
mkdir -p builds/macos
mkdir -p builds/macos-arm64

echo "🔧 بناء التطبيق لجميع الأنظمة..."
echo

# بناء Windows x64
echo "🪟 بناء Windows x64..."
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds/windows
if [ $? -eq 0 ]; then
    echo "✅ Windows x64 تم بناؤه بنجاح"
else
    echo "❌ فشل في بناء Windows x64"
fi
echo

# بناء Linux x64
echo "🐧 بناء Linux x64..."
dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds/linux
if [ $? -eq 0 ]; then
    echo "✅ Linux x64 تم بناؤه بنجاح"
    # إنشاء ملف تنفيذي
    chmod +x builds/linux/MedicalLabAnalyzer
else
    echo "❌ فشل في بناء Linux x64"
fi
echo

# بناء macOS x64
echo "🍎 بناء macOS x64..."
dotnet publish -c Release -r osx-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds/macos
if [ $? -eq 0 ]; then
    echo "✅ macOS x64 تم بناؤه بنجاح"
    # إنشاء ملف تنفيذي
    chmod +x builds/macos/MedicalLabAnalyzer
else
    echo "❌ فشل في بناء macOS x64"
fi
echo

# بناء macOS ARM64 (Apple Silicon)
echo "🍎 بناء macOS ARM64 (Apple Silicon)..."
dotnet publish -c Release -r osx-arm64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds/macos-arm64
if [ $? -eq 0 ]; then
    echo "✅ macOS ARM64 تم بناؤه بنجاح"
    # إنشاء ملف تنفيذي
    chmod +x builds/macos-arm64/MedicalLabAnalyzer
else
    echo "❌ فشل في بناء macOS ARM64"
fi
echo

# نسخ الملفات المشتركة
echo "📁 نسخ الملفات المشتركة..."
cp -r Database builds/windows/
cp -r Database builds/linux/
cp -r Database builds/macos/
cp -r Database builds/macos-arm64/

cp -r Reports builds/windows/
cp -r Reports builds/linux/
cp -r Reports builds/macos/
cp -r Reports builds/macos-arm64/

cp -r UserGuides builds/windows/
cp -r UserGuides builds/linux/
cp -r UserGuides builds/macos/
cp -r UserGuides builds/macos-arm64/

echo "✅ تم نسخ الملفات المشتركة"
echo

# إنشاء ملفات التثبيت
echo "📦 إنشاء ملفات التثبيت..."

# Windows Installer
echo "🪟 إنشاء مثبت Windows..."
cd builds/windows
zip -r ../MedicalLabAnalyzer-Windows-x64.zip .
cd ../..

# Linux Package
echo "🐧 إنشاء حزمة Linux..."
cd builds/linux
tar -czf ../MedicalLabAnalyzer-Linux-x64.tar.gz .
cd ../..

# macOS x64 Package
echo "🍎 إنشاء حزمة macOS x64..."
cd builds/macos
tar -czf ../MedicalLabAnalyzer-macOS-x64.tar.gz .
cd ../..

# macOS ARM64 Package
echo "🍎 إنشاء حزمة macOS ARM64..."
cd builds/macos-arm64
tar -czf ../MedicalLabAnalyzer-macOS-ARM64.tar.gz .
cd ../..

echo "✅ تم إنشاء جميع ملفات التثبيت"
echo

# عرض معلومات البناء
echo "=========================================="
echo "🎉 تم الانتهاء من البناء بنجاح!"
echo "=========================================="
echo
echo "📁 الملفات المتاحة:"
echo "  🪟 Windows x64: builds/MedicalLabAnalyzer-Windows-x64.zip"
echo "  🐧 Linux x64: builds/MedicalLabAnalyzer-Linux-x64.tar.gz"
echo "  🍎 macOS x64: builds/MedicalLabAnalyzer-macOS-x64.tar.gz"
echo "  🍎 macOS ARM64: builds/MedicalLabAnalyzer-macOS-ARM64.tar.gz"
echo
echo "📋 تعليمات التثبيت:"
echo "  🪟 Windows: استخرج الملف ZIP واشغل MedicalLabAnalyzer.exe"
echo "  🐧 Linux: استخرج الملف TAR.GZ واشغل ./MedicalLabAnalyzer"
echo "  🍎 macOS: استخرج الملف TAR.GZ واشغل ./MedicalLabAnalyzer"
echo
echo "🔑 بيانات تسجيل الدخول الافتراضية:"
echo "  Username: admin"
echo "  Password: Admin123!"
echo