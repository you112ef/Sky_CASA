# MedicalLabAnalyzer - Quick Start Guide
# دليل البدء السريع - تحليل المختبر الطبي

## 🚀 Getting Started - البدء

### First Launch - الإطلاق الأول
1. **Run** `MedicalLabAnalyzer.exe` - تشغيل
2. **Login** with default credentials - تسجيل الدخول بالبيانات الافتراضية:
   - Username: `admin`
   - Password: `Admin123!`

### Change Default Password - تغيير كلمة المرور الافتراضية
1. Go to **Settings** → **User Management**
2. Select your user account
3. Click **Change Password**
4. Enter new secure password

## 📋 Basic Workflow - سير العمل الأساسي

### 1. Add New Patient - إضافة مريض جديد
1. Navigate to **Patients** section
2. Click **Add New Patient** button
3. Fill in required information:
   - **MRN**: Medical Record Number
   - **First Name**: الاسم الأول
   - **Last Name**: اسم العائلة
   - **Date of Birth**: تاريخ الميلاد
   - **Gender**: الجنس
4. Click **Save**

### 2. Create New Exam - إنشاء فحص جديد
1. Go to **Exams** section
2. Click **New Exam**
3. Select patient from dropdown
4. Choose exam type:
   - Semen Analysis - تحليل السائل المنوي
   - Sperm Morphology - مورفولوجيا الحيوانات المنوية
   - Motility Test - اختبار الحركة
   - Combined - مجمع
5. Set priority level
6. Add clinical notes
7. Click **Save**

### 3. Add Sample - إضافة عينة
1. In exam details, click **Add Sample**
2. Enter sample information:
   - **Sample Number**: رقم العينة
   - **Chamber Type**: نوع الغرفة (Makler, Neubauer, MicroCell)
   - **Magnification**: التكبير
   - **Frame Rate**: معدل الإطارات
   - **Microns per Pixel**: ميكرون لكل بكسل
3. Click **Save**

### 4. Upload Video - رفع الفيديو
1. Select sample in exam
2. Click **Upload Video**
3. Choose video file (MP4, AVI, MOV)
4. Wait for upload completion
5. Video status will show "Pending"

### 5. Run Video Analysis - تشغيل تحليل الفيديو
1. Select uploaded video
2. Click **Analyze Video**
3. Wait for processing (may take several minutes)
4. Review CASA metrics results
5. Check track classification

### 6. Generate Report - إنشاء التقرير
1. Go to **Reports** section
2. Select completed exam
3. Choose report type:
   - **Preliminary**: أولي
   - **Final**: نهائي
   - **Summary**: ملخص
4. Click **Generate Report**
5. Choose format (PDF or Excel)
6. Save or print report

## 🔬 Understanding CASA Metrics - فهم مقاييس CASA

### Velocity Parameters - معاملات السرعة
- **VCL (Curvilinear Velocity)**: السرعة المنحنية - المسار الفعلي للحيوان المنوي
- **VSL (Straight Line Velocity)**: السرعة المستقيمة - المسافة المباشرة من البداية للنهاية
- **VAP (Average Path Velocity)**: السرعة المتوسطة للمسار - متوسط السرعة على المسار

### Movement Quality - جودة الحركة
- **LIN (Linearity)**: الاستقامة - نسبة VSL إلى VCL
- **STR (Straightness)**: الاستقامة - نسبة VSL إلى VAP
- **WOB (Wobble)**: التذبذب - نسبة VAP إلى VCL

### Beat Parameters - معاملات النبض
- **ALH (Amplitude of Lateral Head Displacement)**: سعة حركة الرأس الجانبية
- **BCF (Beat Cross Frequency)**: تردد تقاطع النبض

### Classification - التصنيف
- **Progressive**: تقدمي - حركة فعالة للأمام
- **Non-Progressive**: غير تقدمي - حركة في مكانها
- **Immotile**: ثابت - بدون حركة

## 📊 Sample Quality Assessment - تقييم جودة العينة

### WHO 2010 Criteria - معايير منظمة الصحة العالمية 2010
- **Volume**: 1.5 mL or more
- **pH**: 7.2 or more
- **Liquefaction**: Within 60 minutes
- **Viscosity**: Normal
- **Concentration**: 15 million/mL or more
- **Total Motility**: 40% or more
- **Progressive Motility**: 32% or more
- **Normal Morphology**: 4% or more
- **Vitality**: 58% or more

## 🔒 Security Best Practices - أفضل ممارسات الأمان

### Password Security - أمان كلمة المرور
- Use strong passwords (minimum 8 characters)
- Include uppercase, lowercase, numbers, and symbols
- Change default password immediately
- Don't share passwords

### User Roles - أدوار المستخدمين
- **Admin**: Full system access
- **Doctor**: Patient and exam management
- **Technician**: Sample and video analysis
- **Viewer**: Read-only access

### Data Protection - حماية البيانات
- Regular backups
- Secure file storage
- Audit trail monitoring
- Access control enforcement

## 🆘 Troubleshooting - حل المشاكل

### Common Issues - المشاكل الشائعة

#### Video Analysis Fails
- Check video format (MP4, AVI, MOV)
- Ensure sufficient disk space
- Verify video file integrity
- Check system resources

#### Database Errors
- Verify SQLite installation
- Check file permissions
- Ensure sufficient disk space
- Restore from backup if needed

#### Performance Issues
- Close other applications
- Check available RAM
- Verify disk space
- Restart application

### Getting Help - الحصول على المساعدة
1. Check **Help** section in application
2. Review **UserGuides** folder
3. Check application logs in **logs** folder
4. Contact system administrator

## 📱 Keyboard Shortcuts - اختصارات لوحة المفاتيح

- **Ctrl+N**: New patient/exam
- **Ctrl+S**: Save
- **Ctrl+F**: Find/search
- **Ctrl+P**: Print
- **F1**: Help
- **F5**: Refresh
- **Ctrl+Tab**: Switch between tabs

## 🌐 Language Support - دعم اللغة

The application supports both English and Arabic:
- Interface text is bilingual
- Patient names can be entered in Arabic
- Clinical notes support Arabic text
- Reports can be generated in both languages

## 📅 Backup Recommendations - توصيات النسخ الاحتياطي

### Automatic Backups
- **Daily**: For active laboratories
- **Weekly**: For standard operations
- **Monthly**: For archival purposes

### Manual Backups
- Before major updates
- Before system maintenance
- When adding large datasets
- Before software upgrades

### Backup Storage
- Local network drive
- External hard drive
- Cloud storage (if available)
- Multiple backup locations

---

**Need more help?** Check the full user manual in the UserGuides folder or contact support.

**هل تحتاج مساعدة إضافية؟** راجع الدليل الكامل في مجلد UserGuides أو اتصل بالدعم.