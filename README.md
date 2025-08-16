# MedicalLabAnalyzer - تحليل المختبر الطبي
# MedicalLabAnalyzer - Medical Laboratory Analysis

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

## 🔧 **البناء من المصدر - Building from Source**

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

# أو استخدام Makefile
make publish-all
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

# أو استخدام PowerShell
.\build-all-platforms.ps1 -Windows
```

### 🐳 **Docker Build**
```bash
# بناء صورة Docker
docker build -t medicallab-analyzer:latest .

# تشغيل الحاوية
docker run -it medicallab-analyzer:latest
```

## 📦 **ملفات البناء - Build Files**

| النظام | الملف | الوصف |
|--------|--------|---------|
| 🪟 **Windows** | `build-windows.bat` | سكريبت بناء Windows |
| 🐧 **Linux** | `build-all-platforms.sh` | سكريبت بناء Linux/macOS |
| 🍎 **macOS** | `Makefile` | نظام بناء متقدم |
| 🪟 **PowerShell** | `build-all-platforms.ps1` | سكريبت PowerShell |
| 🐳 **Docker** | `Dockerfile` | ملف بناء Docker |
| 🔄 **CI/CD** | `.github/workflows/` | GitHub Actions |

## 🌟 **الميزات - Features**

### 🔐 **المصادقة والأمان**
- **أدوار متعددة المستويات**: Admin, Doctor, Technician, Viewer
- **تشفير كلمات المرور**: PBKDF2 مع 150,000 تكرار
- **مصادقة بدون إنترنت**: لا حاجة للاتصال بالإنترنت
- **سجل التدقيق**: تتبع كامل للأنشطة

### 👥 **إدارة المرضى**
- **سجلات المرضى الكاملة**: MRN، البيانات الديموغرافية، التاريخ الطبي
- **دعم اللغة العربية**: لأسماء المرضى والملاحظات
- **البحث والتصفية**: قدرات متقدمة
- **التحقق من MRN**: رقم السجل الطبي

### 🔬 **إدارة الفحوصات**
- **أنواع متعددة**: تحليل السائل المنوي، مورفولوجيا الحيوانات المنوية، اختبار الحركة، مجمع
- **مستويات الأولوية**: منخفض، عادي، عالي، عاجل
- **تتبع الحالة**: قيد التنفيذ، مكتمل، ملغي
- **الملاحظات السريرية**: توثيق كامل

### 📹 **تحليل الفيديو (CASA)**
- **معالجة بدون إنترنت**: باستخدام EmguCV/FFmpeg
- **حساب مقاييس CASA**:
  - VCL (السرعة المنحنية)
  - VSL (السرعة المستقيمة)
  - VAP (السرعة المتوسطة للمسار)
  - ALH (سعة حركة الرأس الجانبية)
  - BCF (تردد تقاطع النبض)
  - LIN (الاستقامة)
  - STR (الاستقامة)
  - WOB (التذبذب)
- **تتبع الحيوانات المنوية**: تصنيف تلقائي
- **تقارير التحليل**: في الوقت الفعلي

### 📊 **إنشاء التقارير**
- **تكامل Crystal Reports**: لإنشاء PDF احترافي
- **قدرات Excel**: تصدير البيانات
- **أنواع متعددة**: أولي، نهائي، ملخص
- **قوالب قابلة للتخصيص**: تصميم احترافي
- **إنشاء بدون إنترنت**: جميع الوظائف محلية

### 💾 **إدارة البيانات**
- **قاعدة بيانات SQLite**: تخزين محلي موثوق
- **Entity Framework Core**: للوصول للبيانات
- **نسخ احتياطية تلقائية**: مع خيارات الجدولة
- **استيراد/تصدير البيانات**: وظائف متقدمة

### 🎨 **واجهة المستخدم**
- **Material Design**: مظهر حديث ومتطور
- **دعم ثنائي اللغة**: (الإنجليزية/العربية)
- **تخطيط متجاوب**: مع شريط تنقل جانبي
- **دعم السمات**: داكن/فاتح

## 🔒 **ميزات الأمان - Security Features**

- **سياسة كلمات المرور**: حد أدنى 8 أحرف مع متطلبات التعقيد
- **إدارة الجلسات**: معالجة آمنة للجلسات
- **التحكم في الوصول**: صلاحيات قائمة على الأدوار
- **مسار التدقيق**: تسجيل كامل للأنشطة
- **تشفير البيانات**: تشفير البيانات الحساسة

## 🌐 **القدرات بدون إنترنت - Offline Capabilities**

التطبيق مصمم للعمل بدون إنترنت تماماً:

- **قاعدة بيانات محلية**: SQLite لتخزين البيانات
- **معالجة الفيديو بدون إنترنت**: EmguCV/FFmpeg لتحليل الفيديو
- **إنشاء التقارير محلياً**: Crystal Reports runtime
- **إدارة النسخ الاحتياطية محلياً**: نظام ملفات النسخ الاحتياطي
- **لا حاجة للإنترنت**: جميع الوظائف تعمل بدون إنترنت

## 📊 **الأداء - Performance**

- **معالجة الفيديو**: محسنة لتحليل الفيديو الطبي
- **أداء قاعدة البيانات**: استعلامات مفهرسة لاسترجاع البيانات السريع
- **إدارة الذاكرة**: استخدام فعال للموارد
- **متعدد الخيوط**: معالجة في الخلفية لتحليل الفيديو

## 🛠️ **التطوير - Development**

### **التقنيات المستخدمة**
- **الواجهة الأمامية**: WPF مع Material Design / Avalonia UI
- **الخلفية**: .NET 8 مع C#
- **قاعدة البيانات**: SQLite مع Entity Framework Core
- **معالجة الفيديو**: EmguCV (OpenCV لـ .NET) / FFmpeg
- **التقارير**: Crystal Reports / iText7
- **الهندسة المعمارية**: نمط MVVM مع حقن التبعيات

### **البناء من المصدر**
```bash
# تثبيت .NET 8 SDK
# https://dotnet.microsoft.com/download/dotnet/8.0

# استنساخ وبناء
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA
dotnet restore
dotnet build --configuration Release
```

### **المساهمة**
1. Fork المستودع
2. إنشاء فرع الميزة
3. إجراء التغييرات
4. إضافة الاختبارات إذا كان ذلك مناسباً
5. تقديم طلب السحب

## 📝 **الترخيص - License**

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🤝 **الدعم - Support**

- **الوثائق**: راجع مجلد `UserGuides/`
- **المشاكل**: أبلغ عن الأخطاء على GitHub Issues
- **المناقشات**: انضم إلى GitHub Discussions
- **البريد الإلكتروني**: support@medicallabanalyzer.com

## 🔄 **تاريخ الإصدارات - Version History**

### **v1.0.0 (الحالي)**
- الإصدار الأول مع جميع الوظائف الأساسية
- إدارة المرضى والفحوصات
- تحليل الفيديو مع مقاييس CASA
- إنشاء التقارير
- التشغيل بدون إنترنت
- **دعم جميع الأنظمة الأساسية**: Windows, Linux, macOS, Docker

### **الميزات المخططة**
- تكامل التعلم العميق للتحليل المتقدم
- النسخ الاحتياطي السحابي والمزامنة
- توسيع دعم اللغات المتعددة
- تطبيق الهاتف المحمول المرافق
- API للتكاملات الخارجية

## 🙏 **الشكر والتقدير**

- **مجتمع OpenCV** لخوارزميات رؤية الحاسوب
- **فريق Material Design** لمكونات الواجهة
- **فريق Avalonia** لواجهة متعددة المنصات
- **مطوري SQLite** لمحرك قاعدة البيانات الموثوق
- **المهنيين الطبيين** للخبرة في المجال

## 📞 **معلومات الاتصال**

- **المطور الرئيسي**: [Your Name]
- **البريد الإلكتروني**: contact@medicallabanalyzer.com
- **الموقع الإلكتروني**: https://medicallabanalyzer.com
- **GitHub**: https://github.com/you112ef/Sky_CASA

---

**MedicalLabAnalyzer** - تطبيق تحليل المختبر الطبي الاحترافي لجميع الأنظمة الأساسية.

*مبني بـ ❤️ للمجتمع الطبي*

---

## 🚀 **بدء سريع - Quick Start**

```bash
# 1. استنساخ المشروع
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA

# 2. بناء لجميع الأنظمة
# Linux/macOS
./build-all-platforms.sh

# Windows
.\build-all-platforms.ps1 -All

# 3. تشغيل التطبيق
# Windows
.\builds\windows\MedicalLabAnalyzer.exe

# Linux/macOS
./builds\linux\MedicalLabAnalyzer

# 4. تسجيل الدخول
# Username: admin
# Password: Admin123!
```
