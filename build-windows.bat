@echo off
chcp 65001 >nul
echo ========================================
echo MedicalLabAnalyzer - بناء Windows
echo ========================================
echo.

echo 🔧 بناء التطبيق لـ Windows...
echo.

REM إنشاء مجلدات البناء
if not exist "builds" mkdir builds
if not exist "builds\windows" mkdir builds\windows
if not exist "builds\installers" mkdir builds\installers

REM بناء التطبيق
echo 🪟 بناء Windows x64...
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:PublishTrimmed=true -o builds\windows
if %errorlevel% neq 0 (
    echo ❌ فشل في بناء Windows x64
    pause
    exit /b 1
)
echo ✅ Windows x64 تم بناؤه بنجاح
echo.

REM نسخ الملفات المشتركة
echo 📁 نسخ الملفات المشتركة...
xcopy "Database" "builds\windows\Database\" /E /I /Y >nul 2>&1
xcopy "Reports" "builds\windows\Reports\" /E /I /Y >nul 2>&1
xcopy "UserGuides" "builds\windows\UserGuides\" /E /I /Y >nul 2>&1
echo ✅ تم نسخ الملفات المشتركة
echo.

REM إنشاء ملف ZIP
echo 📦 إنشاء ملف ZIP...
cd builds\windows
powershell -command "Compress-Archive -Path * -DestinationPath ..\MedicalLabAnalyzer-Windows-x64.zip -Force"
cd ..\..
echo ✅ تم إنشاء ملف ZIP
echo.

REM إنشاء مثبت MSI (إذا كان WiX متوفر)
echo 🚀 إنشاء مثبت MSI...
if exist "C:\Program Files (x86)\WiX Toolset v3.11\bin\candle.exe" (
    echo إنشاء ملفات WiX...
    
    REM إنشاء ملف WiX
    echo ^<?xml version="1.0" encoding="UTF-8"?^> > builds\installers\MedicalLabAnalyzer.wxs
    echo ^<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi"^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo   ^<Product Id="*" Name="MedicalLabAnalyzer" Language="1033" Version="1.0.0.0" Manufacturer="MedicalLab" UpgradeCode="PUT-GUID-HERE"^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<Package InstallerVersion="200" Compressed="yes" InstallScope="perMachine" /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<MajorUpgrade DowngradeErrorMessage="A newer version of [ProductName] is already installed." /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<MediaTemplate /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<Feature Id="ProductFeature" Title="MedicalLabAnalyzer" Level="1"^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo       ^<ComponentGroupRef Id="ProductComponents" /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^</Feature^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<UIRef Id="WixUI_Minimal" /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo   ^</Product^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo   ^<Fragment^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^<Directory Id="TARGETDIR" Name="SourceDir"^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo       ^<Directory Id="ProgramFilesFolder"^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo         ^<Directory Id="INSTALLFOLDER" Name="MedicalLabAnalyzer" /^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo       ^</Directory^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo     ^</Directory^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo   ^</Fragment^> >> builds\installers\MedicalLabAnalyzer.wxs
    echo ^</Wix^> >> builds\installers\MedicalLabAnalyzer.wxs
    
    echo ✅ تم إنشاء ملف WiX
    echo.
    echo 📝 ملاحظة: لإنشاء مثبت MSI، قم بتثبيت WiX Toolset
    echo    https://wixtoolset.org/releases/
) else (
    echo ℹ️ WiX Toolset غير متوفر - تخطي إنشاء MSI
    echo    لإنشاء مثبت MSI، قم بتثبيت WiX Toolset
)
echo.

echo ========================================
echo 🎉 تم الانتهاء من البناء بنجاح!
echo ========================================
echo.
echo 📁 الملفات المتاحة:
echo   🪟 Windows x64: builds\MedicalLabAnalyzer-Windows-x64.zip
echo.
echo 📋 تعليمات التثبيت:
echo   1. استخرج الملف ZIP
echo   2. اشغل MedicalLabAnalyzer.exe
echo   3. سجل الدخول بـ:
echo      Username: admin
echo      Password: Admin123!
echo.
echo 🔧 متطلبات النظام:
echo   - Windows 10/11 (64-bit)
echo   - .NET 8.0 Runtime (مضمن في التطبيق)
echo.
pause