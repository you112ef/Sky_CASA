# نظام التحليل الطبي المختبري

تطبيق ويب شامل لإدارة الفحوصات الطبية وتحليل الصور وتوليد التقارير باستخدام الذكاء الاصطناعي.

## 🚀 النشر السريع

### النشر على Vercel (موصى به)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/medical-lab-analyzer)

### النشر على Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/medical-lab-analyzer)

## المميزات الرئيسية

### 🔐 نظام إدارة المستخدمين
- تسجيل دخول آمن مع صلاحيات متعددة المستويات
- إدارة المستخدمين (مدير، طبيب، فني مختبر)
- حماية البيانات والجلسات

### 👥 إدارة المرضى
- تسجيل بيانات المرضى الكاملة
- البحث والتصفية المتقدمة
- التاريخ الطبي والتحديثات
- إدارة الملفات الطبية

### 🔬 إدارة الفحوصات
- إنشاء وتتبع الفحوصات الطبية
- أنواع فحوصات متعددة وقابلة للتخصيص
- حالة الفحص في الوقت الفعلي
- ربط الفحوصات بالمرضى والأطباء

### 🖼️ تحليل الصور الطبية
- رفع الصور الطبية (JPG, PNG, TIFF)
- تحليل تلقائي باستخدام الذكاء الاصطناعي
- عد الخلايا وتصنيفها
- اكتشاف المناطق غير الطبيعية
- تحليل الألوان والكثافة

### 📊 النتائج والتحليلات
- عرض النتائج بشكل مرئي
- مقارنة النتائج بالقيم الطبيعية
- رسوم بيانية تفاعلية
- تصدير النتائج بصيغ متعددة

### 📋 التقارير الطبية
- توليد تقارير احترافية
- قوالب تقارير قابلة للتخصيص
- تصدير بصيغ PDF و Excel
- طباعة مباشرة

### 📈 لوحة التحكم
- إحصائيات شاملة في الوقت الفعلي
- رسوم بيانية تفاعلية
- تتبع الأداء والإنتاجية
- تنبيهات وإشعارات

## التقنيات المستخدمة

### Frontend
- **Next.js 14** - إطار العمل الرئيسي
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - لكتابة كود آمن ومنظم
- **Tailwind CSS** - للتصميم والأنماط
- **Radix UI** - مكونات واجهة المستخدم
- **Lucide React** - الأيقونات

### Backend & Database
- **Next.js API Routes** - واجهات برمجة التطبيقات
- **SQLite** - قاعدة البيانات المحلية
- **Better SQLite3** - محرك قاعدة البيانات

### الذكاء الاصطناعي
- **Google Generative AI** - لتحليل الصور والنصوص
- **Custom AI Models** - لنماذج تحليل الصور المتخصصة

### الأدوات الإضافية
- **React Hook Form** - إدارة النماذج
- **Zod** - التحقق من صحة البيانات
- **Recharts** - الرسوم البيانية
- **NextAuth.js** - المصادقة والتفويض

## التثبيت والتشغيل

### المتطلبات الأساسية
- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/your-username/medical-lab-analyzer.git
cd medical-lab-analyzer
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env.local
```

قم بتعديل ملف `.env.local` وأضف:
```env
# Database
DATABASE_URL="file:./medical_lab.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google AI
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

4. **تشغيل قاعدة البيانات**
```bash
npm run db:setup
```

5. **تشغيل التطبيق**
```bash
npm run dev
```

6. **فتح المتصفح**
```
http://localhost:3000
```

## النشر

### النشر على Vercel (موصى به)
1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط "New Project"
3. اختر المستودع `medical-lab-analyzer`
4. اضبط متغيرات البيئة
5. اضغط "Deploy"

### النشر على Docker
```bash
# بناء الصورة
docker build -t medical-lab-analyzer .

# تشغيل الحاوية
docker run -p 3000:3000 medical-lab-analyzer

# أو استخدام Docker Compose
docker-compose up -d
```

### النشر على الخادم المحلي
```bash
# بناء التطبيق
npm run build

# تشغيل التطبيق
npm start
```

## هيكل المشروع

```
medical-lab-analyzer/
├── src/
│   ├── app/                    # صفحات التطبيق
│   │   ├── api/               # واجهات برمجة التطبيقات
│   │   ├── dashboard/         # لوحة التحكم
│   │   ├── globals.css        # الأنماط العامة
│   │   ├── layout.tsx         # التخطيط الرئيسي
│   │   └── page.tsx           # الصفحة الرئيسية
│   ├── components/            # مكونات React
│   │   ├── dashboard/         # مكونات لوحة التحكم
│   │   ├── forms/             # نماذج الإدخال
│   │   └── ui/                # مكونات واجهة المستخدم
│   ├── lib/                   # المكتبات والأدوات
│   ├── types/                 # أنواع TypeScript
│   └── utils/                 # الدوال المساعدة
├── public/                    # الملفات العامة
├── database/                  # ملفات قاعدة البيانات
├── scripts/                   # سكربتات الإعداد
├── docs/                      # الوثائق
└── .github/                   # إعدادات GitHub
```

## الميزات المتقدمة

### 🔒 الأمان
- تشفير كلمات المرور
- حماية من هجمات CSRF
- التحقق من صحة المدخلات
- تسجيل الأحداث الأمنية

### 📱 التجاوب
- تصميم متجاوب لجميع الأجهزة
- دعم الأجهزة اللوحية والهواتف
- واجهة محسنة للأجهزة اللمسية

### 🌐 دعم متعدد اللغات
- واجهة عربية كاملة
- دعم RTL (من اليمين لليسار)
- إمكانية إضافة لغات أخرى

### 🔄 النسخ الاحتياطي
- نسخ احتياطي تلقائي لقاعدة البيانات
- تصدير البيانات بصيغ متعددة
- استعادة البيانات بسهولة

## المساهمة

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للبدء.

### كيفية المساهمة
1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. الالتزام بالتغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للدعم والمساعدة:
- 📧 البريد الإلكتروني: support@medicallab.com
- 📱 الهاتف: +966-50-123-4567
- 🌐 الموقع: https://medicallab.com
- 📖 الوثائق: [SUPPORT.md](SUPPORT.md)

## التطوير المستقبلي

### الميزات المخططة
- [ ] تطبيق الهاتف المحمول
- [ ] تكامل مع أنظمة المستشفيات
- [ ] تحليل متقدم للصور المجهرية
- [ ] نظام تنبيهات ذكي
- [ ] تقارير متقدمة مع الذكاء الاصطناعي
- [ ] دعم الأجهزة الطبية المتخصصة

### التحسينات التقنية
- [ ] تحسين الأداء والسرعة
- [ ] إضافة اختبارات شاملة
- [ ] تحسين الأمان
- [ ] دعم قواعد بيانات متقدمة
- [ ] تحسين واجهة المستخدم

## الإحصائيات

![GitHub stars](https://img.shields.io/github/stars/your-username/medical-lab-analyzer?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/medical-lab-analyzer?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/medical-lab-analyzer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/medical-lab-analyzer)
![GitHub license](https://img.shields.io/github/license/your-username/medical-lab-analyzer)

---

**ملاحظة**: هذا التطبيق مخصص للاستخدام الطبي ويجب أن يتم تشغيله وفقاً للمعايير الطبية والتنظيمية المحلية.

**⭐ إذا أعجبك هذا المشروع، لا تنس إعطاءه نجمة على GitHub!**
