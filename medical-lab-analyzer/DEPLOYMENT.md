# تعليمات النشر

## النشر على GitHub

### 1. إنشاء مستودع جديد على GitHub
1. اذهب إلى [GitHub](https://github.com)
2. اضغط على "New repository"
3. أدخل اسم المستودع: `medical-lab-analyzer`
4. اختر "Public" أو "Private" حسب رغبتك
5. لا تضع علامة على "Initialize this repository with a README"
6. اضغط "Create repository"

### 2. رفع الكود إلى GitHub
```bash
# تغيير الـ remote URL إلى المستودع الجديد
git remote set-url origin https://github.com/YOUR_USERNAME/medical-lab-analyzer.git

# رفع الكود
git push -u origin main
```

## النشر على Vercel

### 1. ربط المشروع بـ Vercel
1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط "New Project"
3. اختر المستودع `medical-lab-analyzer`
4. اضغط "Import"

### 2. إعداد متغيرات البيئة
أضف المتغيرات التالية في إعدادات المشروع:
```
DATABASE_URL=file:./database/medical_lab.db
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

### 3. النشر
اضغط "Deploy" وسيتم نشر التطبيق تلقائياً.

## النشر على Docker

### 1. بناء الصورة
```bash
docker build -t medical-lab-analyzer .
```

### 2. تشغيل الحاوية
```bash
docker run -p 3000:3000 medical-lab-analyzer
```

### 3. استخدام Docker Compose
```bash
docker-compose up -d
```

## النشر على الخادم المحلي

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد قاعدة البيانات
```bash
npm run db:setup
```

### 3. تشغيل التطبيق
```bash
# للتطوير
npm run dev

# للإنتاج
npm run build
npm start
```

## النشر على AWS

### 1. استخدام AWS Amplify
1. اذهب إلى [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. اضغط "New app" > "Host web app"
3. اختر GitHub وربط المستودع
4. اتبع الخطوات التلقائية

### 2. استخدام AWS EC2
```bash
# توصيل بالخادم
ssh -i your-key.pem ubuntu@your-server-ip

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/medical-lab-analyzer.git
cd medical-lab-analyzer

# تثبيت التبعيات
npm install

# إعداد قاعدة البيانات
npm run db:setup

# بناء التطبيق
npm run build

# تشغيل التطبيق
npm start
```

## النشر على Azure

### 1. استخدام Azure App Service
1. اذهب إلى [Azure Portal](https://portal.azure.com)
2. أنشئ "App Service"
3. اختر "Node.js" كـ runtime
4. اربط المستودع بـ GitHub
5. اضبط متغيرات البيئة

### 2. استخدام Azure Static Web Apps
1. اذهب إلى [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/)
2. اضغط "Create Static Web App"
3. اربط المستودع بـ GitHub
4. اتبع الخطوات التلقائية

## النشر على Google Cloud

### 1. استخدام Google App Engine
1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. فعّل App Engine API
4. اتبع [دليل النشر](https://cloud.google.com/appengine/docs/standard/nodejs/building-app)

### 2. استخدام Google Cloud Run
```bash
# بناء الصورة
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/medical-lab-analyzer

# نشر الصورة
gcloud run deploy medical-lab-analyzer \
  --image gcr.io/YOUR_PROJECT_ID/medical-lab-analyzer \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## إعدادات الأمان

### 1. متغيرات البيئة
تأكد من إعداد المتغيرات التالية:
- `NEXTAUTH_SECRET`: مفتاح سري قوي
- `DATABASE_URL`: رابط قاعدة البيانات
- `GOOGLE_AI_API_KEY`: مفتاح Google AI API

### 2. HTTPS
تأكد من تفعيل HTTPS في الإنتاج:
- Vercel: تلقائي
- AWS: إعداد SSL Certificate
- Azure: إعداد Custom Domain
- Google Cloud: إعداد SSL

### 3. قاعدة البيانات
للإنتاج، يُنصح باستخدام قاعدة بيانات خارجية:
- PostgreSQL على AWS RDS
- Azure Database for PostgreSQL
- Google Cloud SQL

## المراقبة والتتبع

### 1. إضافة أدوات المراقبة
```bash
# تثبيت Sentry للمراقبة
npm install @sentry/nextjs

# تثبيت LogRocket للتتبع
npm install logrocket
```

### 2. إعداد التحليلات
- Google Analytics
- Mixpanel
- Amplitude

## النسخ الاحتياطي

### 1. قاعدة البيانات
```bash
# نسخ احتياطي يومي
0 2 * * * pg_dump -h localhost -U username database_name > backup_$(date +\%Y\%m\%d).sql
```

### 2. الملفات
```bash
# نسخ احتياطي للملفات المرفوعة
rsync -av /app/public/uploads/ /backup/uploads/
```

## الدعم والصيانة

### 1. التحديثات
```bash
# تحديث التبعيات
npm update

# فحص الثغرات الأمنية
npm audit

# إصلاح الثغرات
npm audit fix
```

### 2. المراقبة
- مراقبة استخدام الموارد
- مراقبة الأخطاء
- مراقبة الأداء

---

**ملاحظة**: تأكد من قراءة ملف README.md للحصول على معلومات إضافية حول التطبيق.