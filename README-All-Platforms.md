# MedicalLabAnalyzer - لجميع الأنظمة الأساسية
# MedicalLabAnalyzer - For All Platforms

## 🌍 **الأنظمة المدعومة - Supported Platforms**

| النظام | الإصدار | الحالة | الملف |
|--------|----------|---------|--------|
| 🪟 **Windows** | 10/11 (64-bit) | ✅ مدعوم | `.exe` |
| 🐧 **Linux** | Ubuntu 20.04+, CentOS 8+ | ✅ مدعوم | Binary |
| 🍎 **macOS** | 10.15+ (Intel) | ✅ مدعوم | Binary |
| 🍎 **macOS** | 11.0+ (Apple Silicon) | ✅ مدعوم | Binary |
| 🐳 **Docker** | All Platforms | ✅ مدعوم | Container |

## 🚀 **التثبيت السريع - Quick Installation**

### 🪟 **Windows**
```bash
# تحميل الملف
wget https://github.com/you112ef/Sky_CASA/releases/latest/download/MedicalLabAnalyzer-Windows-x64.zip

# استخراج الملف
Expand-Archive -Path "MedicalLabAnalyzer-Windows-x64.zip" -DestinationPath "MedicalLabAnalyzer"

# تشغيل التطبيق
cd MedicalLabAnalyzer
.\MedicalLabAnalyzer.exe
```

### 🐧 **Linux**
```bash
# تحميل الملف
wget https://github.com/you112ef/Sky_CASA/releases/latest/download/MedicalLabAnalyzer-Linux-x64.tar.gz

# استخراج الملف
tar -xzf MedicalLabAnalyzer-Linux-x64.tar.gz

# جعل الملف قابل للتنفيذ
chmod +x MedicalLabAnalyzer

# تشغيل التطبيق
./MedicalLabAnalyzer
```

### 🍎 **macOS**
```bash
# تحميل الملف (Intel)
curl -L -o MedicalLabAnalyzer-macOS-x64.tar.gz https://github.com/you112ef/Sky_CASA/releases/latest/download/MedicalLabAnalyzer-macOS-x64.tar.gz

# أو (Apple Silicon)
curl -L -o MedicalLabAnalyzer-macOS-ARM64.tar.gz https://github.com/you112ef/Sky_CASA/releases/latest/download/MedicalLabAnalyzer-macOS-ARM64.tar.gz

# استخراج الملف
tar -xzf MedicalLabAnalyzer-macOS-x64.tar.gz

# جعل الملف قابل للتنفيذ
chmod +x MedicalLabAnalyzer

# تشغيل التطبيق
./MedicalLabAnalyzer
```

### 🐳 **Docker**
```bash
# تشغيل التطبيق في Docker
docker run -d \
  --name medicallab-analyzer \
  -p 8080:8080 \
  -v $(pwd)/Database:/app/Database \
  -v $(pwd)/Reports:/app/Reports \
  -v $(pwd)/UserGuides:/app/UserGuides \
  medicallab-analyzer:latest

# أو استخدام docker-compose
docker-compose up -d
```

## 🔧 **متطلبات النظام - System Requirements**

### 🪟 **Windows**
- Windows 10/11 (64-bit)
- 4 GB RAM minimum
- 2 GB free disk space
- .NET 8.0 Runtime (مضمن)

### 🐧 **Linux**
- Ubuntu 20.04+, CentOS 8+, RHEL 8+
- 4 GB RAM minimum
- 2 GB free disk space
- FFmpeg (مثبت تلقائياً)

### 🍎 **macOS**
- macOS 10.15+ (Intel) أو 11.0+ (Apple Silicon)
- 4 GB RAM minimum
- 2 GB free disk space
- FFmpeg (مثبت تلقائياً)

## 📦 **البناء من المصدر - Building from Source**

### 🐧 **Linux/macOS**
```bash
# استنساخ المشروع
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA

# تثبيت .NET 8 SDK
# Ubuntu/Debian
sudo apt-get install -y dotnet-sdk-8.0

# CentOS/RHEL
sudo yum install -y dotnet-sdk-8.0

# macOS
brew install dotnet

# بناء لجميع الأنظمة
chmod +x build-all-platforms.sh
./build-all-platforms.sh
```

### 🪟 **Windows**
```bash
# استنساخ المشروع
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA

# تثبيت .NET 8 SDK
# https://dotnet.microsoft.com/download/dotnet/8.0

# بناء Windows
build-windows.bat
```

### 🐳 **Docker Build**
```bash
# بناء صورة Docker
docker build -t medicallab-analyzer:latest .

# تشغيل الحاوية
docker run -it medicallab-analyzer:latest
```

## 🌐 **التشغيل عبر الويب - Web Interface**

يمكن تشغيل التطبيق عبر المتصفح:

```bash
# تشغيل الخادم
./MedicalLabAnalyzer --web --port 8080

# فتح المتصفح
# http://localhost:8080
```

## 📱 **واجهة المستخدم - User Interface**

### 🪟 **Windows**
- WPF مع Material Design
- دعم كامل للغة العربية
- واجهة حديثة ومتجاوبة

### 🐧 **Linux/macOS**
- Avalonia UI
- دعم كامل للغة العربية
- واجهة متوافقة مع النظام

## 🔒 **الأمان - Security**

- **تشفير كلمات المرور**: PBKDF2 مع 150,000 تكرار
- **إدارة الأدوار**: Admin, Doctor, Technician, Viewer
- **سجل التدقيق**: تتبع كامل للأنشطة
- **نسخ احتياطي**: تلقائي ومؤمن

## 📊 **الميزات - Features**

### 🔬 **تحليل الفيديو**
- **CASA Metrics**: VCL, VSL, VAP, ALH, BCF, LIN, STR, WOB
- **تتبع الحيوانات المنوية**: تلقائي ودقيق
- **معالجة الفيديو**: دعم MP4, AVI, MOV

### 📋 **إدارة المرضى**
- **سجلات المرضى**: كاملة ومفصلة
- **الفحوصات**: تتبع الحالة والأولوية
- **العينات**: إدارة العينات والنتائج

### 📄 **التقارير**
- **PDF**: Crystal Reports
- **Excel**: تصدير البيانات
- **قوالب**: قابلة للتخصيص

## 🆘 **الدعم - Support**

### 📚 **الوثائق**
- `UserGuides/` - دليل المستخدم
- `README.md` - الوثائق الأساسية
- `CONTRIBUTING.md` - دليل المساهمة

### 🐛 **الإبلاغ عن الأخطاء**
- GitHub Issues: [Sky_CASA Issues](https://github.com/you112ef/Sky_CASA/issues)
- Email: support@medicallabanalyzer.com

### 💬 **المجتمع**
- GitHub Discussions: [Sky_CASA Discussions](https://github.com/you112ef/Sky_CASA/discussions)
- Discord: [MedicalLabAnalyzer Community](https://discord.gg/medicallab)

## 🔄 **التحديثات - Updates**

### 🚀 **الإصدار الحالي**
- **v1.0.0**: الإصدار الأول مع جميع الميزات الأساسية

### 📅 **جدول التحديثات**
- **v1.1.0**: دعم متعدد اللغات
- **v1.2.0**: واجهة ويب
- **v2.0.0**: ذكاء اصطناعي متقدم

## 📄 **الترخيص - License**

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 **الشكر والتقدير**

- **OpenCV Community** - خوارزميات رؤية الحاسوب
- **Material Design** - مكونات الواجهة
- **Avalonia Team** - واجهة متعددة المنصات
- **FFmpeg** - معالجة الفيديو

## 📞 **معلومات الاتصال**

- **المطور الرئيسي**: [Your Name]
- **البريد الإلكتروني**: contact@medicallabanalyzer.com
- **الموقع الإلكتروني**: https://medicallabanalyzer.com
- **GitHub**: https://github.com/you112ef/Sky_CASA

---

**MedicalLabAnalyzer** - تطبيق تحليل المختبر الطبي الاحترافي لجميع الأنظمة الأساسية.

*مبني بـ ❤️ للمجتمع الطبي*