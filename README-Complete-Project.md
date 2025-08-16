# MedicalLabAnalyzer - المشروع المكتمل
# MedicalLabAnalyzer - Complete Project

## 🎯 **نظرة عامة - Overview**

**MedicalLabAnalyzer** هو تطبيق طبي متكامل ومتعدد المنصات مصمم لتحليل المختبرات الطبية وإدارة المرضى والفحوصات. التطبيق يعمل بالكامل بدون إنترنت ويوفر واجهة مستخدم حديثة ومتطورة.

## 🌟 **الميزات الرئيسية - Key Features**

### 🔐 **نظام المصادقة والأمان**
- **مصادقة متقدمة**: PBKDF2 مع 150,000 تكرار
- **أدوار متعددة المستويات**: Admin, Doctor, Technician, Viewer
- **إدارة الجلسات**: معالجة آمنة للجلسات
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

## 🏗️ **الهندسة المعمارية - Architecture**

### **نمط MVVM مع Prism**
- **ViewModels**: إدارة منطق الأعمال
- **Views**: واجهات المستخدم
- **Models**: نماذج البيانات
- **Services**: طبقة الخدمات
- **Commands**: أوامر المستخدم

### **قاعدة البيانات**
- **SQLite**: قاعدة بيانات محلية موثوقة
- **Entity Framework Core**: ORM للوصول للبيانات
- **Dapper**: للاستعلامات عالية الأداء
- **Migrations**: إدارة تطور قاعدة البيانات

### **معالجة الفيديو**
- **EmguCV**: OpenCV لـ .NET (Windows)
- **FFmpeg**: معالجة الفيديو (Linux/macOS)
- **SkiaSharp**: معالجة الصور (Cross-platform)

## 📁 **هيكل المشروع - Project Structure**

```
MedicalLabAnalyzer/
├── Program.cs                          # نقطة الدخول الرئيسية
├── App.xaml                           # تطبيق WPF الرئيسي
├── App.xaml.cs                        # منطق التطبيق
├── MedicalLabAnalyzer.csproj          # ملف المشروع
├── Views/                             # واجهات المستخدم
│   ├── MainWindow.xaml               # النافذة الرئيسية
│   ├── LoginView.xaml                # شاشة تسجيل الدخول
│   ├── PatientManagementView.xaml    # إدارة المرضى
│   ├── ExamManagementView.xaml       # إدارة الفحوصات
│   ├── VideoAnalysisView.xaml        # تحليل الفيديو
│   └── ReportsView.xaml              # التقارير
├── ViewModels/                        # نماذج العرض
│   ├── PatientViewModel.cs           # نموذج المريض
│   ├── ExamViewModel.cs              # نموذج الفحص
│   ├── VideoAnalysisViewModel.cs     # نموذج تحليل الفيديو
│   └── ReportsViewModel.cs           # نموذج التقارير
├── Models/                            # نماذج البيانات
│   ├── PatientModel.cs               # نموذج المريض
│   ├── ExamModel.cs                  # نموذج الفحص
│   ├── UserModel.cs                  # نموذج المستخدم
│   └── VideoAnalysisModel.cs         # نموذج تحليل الفيديو
├── Services/                          # طبقة الخدمات
│   ├── ISecurityService.cs           # خدمة الأمان
│   ├── IPatientService.cs            # خدمة المرضى
│   ├── IExamService.cs               # خدمة الفحوصات
│   ├── IVideoAnalysisService.cs      # خدمة تحليل الفيديو
│   └── IReportingService.cs          # خدمة التقارير
├── Data/                              # طبقة البيانات
│   ├── MedicalLabContext.cs          # سياق EF Core
│   ├── Entities/                     # كيانات قاعدة البيانات
│   └── Repositories/                 # مستودعات البيانات
├── Common/                            # المرافق المشتركة
│   ├── SecurityHelper.cs             # مساعد الأمان
│   ├── ValidationHelper.cs           # مساعد التحقق
│   └── LoggingHelper.cs              # مساعد التسجيل
├── Styles/                            # أنماط التطبيق
│   └── AppStyles.xaml                # الأنماط الرئيسية
├── Resources/                         # الموارد
│   ├── app.ico                       # أيقونة التطبيق
│   └── app.png                       # صورة التطبيق
├── Database/                          # قاعدة البيانات
│   └── create_medical_lab_schema.sql # سكريبت إنشاء الجداول
├── Reports/                           # التقارير
│   └── Templates/                    # قوالب التقارير
└── UserGuides/                        # دليل المستخدم
    └── QuickStartGuide.md             # دليل البدء السريع
```

## 🚀 **كيفية البناء والتشغيل - Build & Run**

### **المتطلبات - Prerequisites**
- **.NET 8 SDK**: https://dotnet.microsoft.com/download/dotnet/8.0
- **Visual Studio 2022/2023** (للتطوير)
- **SQLite** (مضمن في .NET)

### **البناء من المصدر - Build from Source**

#### **Windows**
```bash
# استنساخ المشروع
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA

# تثبيت الحزم
dotnet restore

# بناء المشروع
dotnet build --configuration Release

# تشغيل التطبيق
dotnet run
```

#### **Linux/macOS**
```bash
# استنساخ المشروع
git clone https://github.com/you112ef/Sky_CASA.git
cd Sky_CASA

# تثبيت .NET 8 SDK
# Ubuntu/Debian
sudo apt-get install -y dotnet-sdk-8.0

# macOS
brew install dotnet

# تثبيت الحزم
dotnet restore

# بناء المشروع
dotnet build --configuration Release

# تشغيل التطبيق
dotnet run
```

### **بناء لجميع المنصات - Build for All Platforms**

#### **Linux/macOS**
```bash
chmod +x build-all-platforms.sh
./build-all-platforms.sh
```

#### **Windows**
```bash
build-windows.bat
```

#### **PowerShell**
```powershell
.\build-all-platforms.ps1 -All
```

#### **Makefile**
```bash
make publish-all
```

## 🔧 **التكوين - Configuration**

### **إعدادات قاعدة البيانات**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Database/medical_lab.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  }
}
```

### **إعدادات الأمان**
```json
{
  "Security": {
    "PasswordMinLength": 8,
    "PasswordRequireUppercase": true,
    "PasswordRequireLowercase": true,
    "PasswordRequireDigit": true,
    "PasswordRequireSpecialCharacter": true,
    "SessionTimeoutMinutes": 30
  }
}
```

## 📱 **واجهة المستخدم - User Interface**

### **التصميم الحديث**
- **Material Design**: مظهر حديث ومتطور
- **ألوان متناسقة**: نظام ألوان موحد
- **أيقونات واضحة**: رموز سهلة الفهم
- **تخطيط متجاوب**: يتكيف مع أحجام الشاشات

### **دعم اللغات**
- **الإنجليزية**: اللغة الافتراضية
- **العربية**: دعم كامل للغة العربية
- **RTL**: دعم الاتجاه من اليمين لليسار

### **الملاحة**
- **شريط جانبي**: تنقل سريع بين الأقسام
- **شريط علوي**: أدوات سريعة
- **خبز التنقل**: معرفة الموقع الحالي
- **اختصارات لوحة المفاتيح**: سرعة في العمل

## 🔒 **الأمان - Security**

### **تشفير كلمات المرور**
- **PBKDF2**: خوارزمية تشفير قوية
- **150,000 تكرار**: مستوى أمان عالي
- **ملح عشوائي**: حماية إضافية

### **إدارة الجلسات**
- **رموز JWT**: مصادقة آمنة
- **انتهاء الصلاحية**: جلسات محدودة الوقت
- **تسجيل الخروج التلقائي**: حماية البيانات

### **التحكم في الوصول**
- **أدوار المستخدمين**: صلاحيات محددة
- **التحقق من الصلاحيات**: قبل تنفيذ العمليات
- **سجل التدقيق**: تتبع جميع الأنشطة

## 🌐 **القدرات بدون إنترنت - Offline Capabilities**

### **قاعدة البيانات المحلية**
- **SQLite**: قاعدة بيانات مضمنة
- **مزامنة محلية**: تحديثات فورية
- **نسخ احتياطية**: حماية البيانات

### **معالجة الفيديو المحلية**
- **EmguCV**: معالجة بدون إنترنت
- **FFmpeg**: تحويل وتحرير الفيديو
- **خوارزميات محلية**: تحليل CASA

### **التقارير المحلية**
- **Crystal Reports**: إنشاء PDF
- **EPPlus**: إنشاء Excel
- **قوالب محلية**: لا حاجة للإنترنت

## 📊 **الأداء - Performance**

### **تحسين قاعدة البيانات**
- **الفهارس**: استعلامات سريعة
- **الاستعلامات المحسنة**: استخدام Dapper
- **التخزين المؤقت**: تقليل وقت الاستجابة

### **معالجة الفيديو**
- **متعدد الخيوط**: معالجة متوازية
- **تحسين الذاكرة**: إدارة فعالة للموارد
- **خوارزميات محسنة**: سرعة في التحليل

### **واجهة المستخدم**
- **Virtualization**: قوائم كبيرة
- **Lazy Loading**: تحميل عند الحاجة
- **Background Processing**: عمليات في الخلفية

## 🧪 **الاختبار - Testing**

### **اختبارات الوحدة**
- **xUnit**: إطار الاختبارات
- **Moq**: محاكاة الخدمات
- **FluentAssertions**: تأكيدات واضحة

### **اختبارات التكامل**
- **SQLite In-Memory**: اختبارات قاعدة البيانات
- **Test Containers**: اختبارات Docker
- **API Testing**: اختبارات الخدمات

### **اختبارات الواجهة**
- **Selenium**: اختبارات المتصفح
- **Appium**: اختبارات التطبيقات
- **Accessibility Testing**: اختبارات إمكانية الوصول

## 📦 **النشر - Deployment**

### **حزم التوزيع**
- **Windows**: ملفات ZIP وMSI
- **Linux**: حزم TAR.GZ
- **macOS**: حزم TAR.GZ
- **Docker**: صور الحاويات

### **التثبيت**
- **مثبت Windows**: WiX Toolset
- **حزم Linux**: RPM/DEB
- **حزم macOS**: Homebrew
- **Docker**: docker-compose

### **التحديثات**
- **Auto-Updater**: تحديثات تلقائية
- **Delta Updates**: تحديثات جزئية
- **Rollback**: العودة للإصدار السابق

## 🔄 **التطوير المستمر - Continuous Development**

### **GitHub Actions**
- **بناء تلقائي**: لجميع المنصات
- **اختبارات تلقائية**: عند كل commit
- **نشر تلقائي**: عند إنشاء release

### **إدارة الإصدارات**
- **Semantic Versioning**: إصدارات منطقية
- **Changelog**: سجل التغييرات
- **Release Notes**: ملاحظات الإصدار

### **المساهمة**
- **Fork & Pull Request**: نموذج المساهمة
- **Code Review**: مراجعة الكود
- **Contributing Guidelines**: إرشادات المساهمة

## 📚 **الوثائق - Documentation**

### **دليل المطور**
- **API Reference**: مرجع واجهات البرمجة
- **Architecture Guide**: دليل الهندسة المعمارية
- **Development Setup**: إعداد بيئة التطوير

### **دليل المستخدم**
- **Quick Start Guide**: دليل البدء السريع
- **User Manual**: دليل المستخدم الكامل
- **Video Tutorials**: دروس فيديو

### **دليل الإدارة**
- **Installation Guide**: دليل التثبيت
- **Configuration Guide**: دليل التكوين
- **Maintenance Guide**: دليل الصيانة

## 🤝 **الدعم - Support**

### **المجتمع**
- **GitHub Issues**: الإبلاغ عن الأخطاء
- **GitHub Discussions**: المناقشات
- **Discord Server**: مجتمع مباشر

### **الوثائق**
- **Wiki**: موسوعة المشروع
- **FAQ**: الأسئلة الشائعة
- **Troubleshooting**: حل المشاكل

### **التواصل**
- **Email**: support@medicallabanalyzer.com
- **Website**: https://medicallabanalyzer.com
- **Social Media**: Twitter, LinkedIn

## 📄 **الترخيص - License**

هذا المشروع مرخص تحت رخصة **MIT** - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 **الشكر والتقدير - Acknowledgments**

- **مجتمع OpenCV**: خوارزميات رؤية الحاسوب
- **فريق Material Design**: مكونات الواجهة
- **فريق Prism**: إطار MVVM
- **فريق Dapper**: ORM عالي الأداء
- **المهنيين الطبيين**: الخبرة في المجال

## 📞 **معلومات الاتصال - Contact**

- **المطور الرئيسي**: [Your Name]
- **البريد الإلكتروني**: contact@medicallabanalyzer.com
- **الموقع الإلكتروني**: https://medicallabanalyzer.com
- **GitHub**: https://github.com/you112ef/Sky_CASA

---

## 🎉 **الخلاصة - Summary**

**MedicalLabAnalyzer** هو تطبيق طبي متكامل ومتطور يوفر:

✅ **واجهة مستخدم حديثة** مع Material Design  
✅ **دعم متعدد المنصات** (Windows, Linux, macOS, Docker)  
✅ **معالجة فيديو متقدمة** مع مقاييس CASA  
✅ **نظام أمان قوي** مع تشفير متقدم  
✅ **عمل بدون إنترنت** مع قاعدة بيانات محلية  
✅ **تقارير احترافية** PDF وExcel  
✅ **أداء عالي** مع تحسينات شاملة  
✅ **كود نظيف** مع نمط MVVM  

*مبني بـ ❤️ للمجتمع الطبي*

---

**🚀 جاهز للاستخدام في الإنتاج!**