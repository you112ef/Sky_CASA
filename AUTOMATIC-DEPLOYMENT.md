# 🚀 النشر التلقائي - Medical Lab Analyzer

## 📋 نظرة عامة

تم إعداد نظام النشر التلقائي الشامل لجميع المنصات والخدمات. النظام يعمل تلقائياً عند كل push إلى الفرع الرئيسي أو عند إنشاء Pull Request.

## 🔧 المنصات المدعومة

### 1. **تطبيق .NET Desktop**
- ✅ Windows x64
- ✅ Linux x64  
- ✅ macOS x64
- ✅ macOS ARM64

### 2. **تطبيق Next.js Web**
- ✅ Netlify
- ✅ Vercel
- ✅ GitHub Pages

### 3. **Docker Images**
- ✅ Docker Hub
- ✅ GitHub Container Registry

### 4. **GitHub Releases**
- ✅ إصدارات تلقائية مع Assets

## 📁 ملفات Workflow

### `build-all-platforms.yml`
النشر الرئيسي لجميع منصات .NET:
- Windows, Linux, macOS
- اختبارات تلقائية
- إنشاء ملفات مضغوطة
- رفع Artifacts

### `quick-build.yml`
بناء سريع للاختبار:
- Linux build
- Next.js build
- Docker build

### `netlify-deploy.yml`
النشر التلقائي على Netlify:
- بناء Next.js
- نشر تلقائي
- تعليقات على Commits

### `vercel-deploy.yml`
النشر التلقائي على Vercel:
- بناء Next.js
- نشر تلقائي
- إدارة المشروع

### `docker-deploy.yml`
النشر التلقائي على Docker Hub:
- بناء صور Docker
- رفع تلقائي
- إدارة Tags

### `release.yml`
إنشاء إصدارات GitHub:
- بناء جميع المنصات
- إنشاء Release
- رفع Assets

## 🔑 إعداد Secrets

### Netlify
```bash
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### Vercel
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Docker Hub
```bash
DOCKERHUB_USERNAME=your_username
DOCKERHUB_TOKEN=your_token
```

## 🚀 كيفية التشغيل

### 1. **النشر التلقائي**
```bash
# عند كل push إلى main
git push origin main
```

### 2. **تشغيل يدوي**
```bash
# من GitHub Actions
# اختر Workflow -> Run workflow
```

### 3. **إنشاء إصدار**
```bash
# إنشاء tag
git tag v1.0.0
git push origin v1.0.0
```

## 📊 مراقبة النشر

### GitHub Actions
- انتقل إلى `Actions` tab
- راقب حالة كل workflow
- تحقق من Artifacts

### Logs
- كل خطوة لها logs مفصلة
- يمكن تحميل Artifacts
- إشعارات تلقائية

## 🔄 التحديثات التلقائية

### عند Push إلى main:
1. ✅ بناء جميع منصات .NET
2. ✅ بناء تطبيق Next.js
3. ✅ بناء صور Docker
4. ✅ نشر على Netlify/Vercel
5. ✅ رفع على Docker Hub

### عند إنشاء Tag:
1. ✅ بناء جميع المنصات
2. ✅ إنشاء GitHub Release
3. ✅ رفع Assets
4. ✅ نشر Docker images

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة:
1. **فشل في بناء .NET**
   - تحقق من إصدار .NET
   - تحقق من التبعيات

2. **فشل في بناء Next.js**
   - تحقق من Node.js version
   - تحقق من package.json

3. **فشل في Docker**
   - تحقق من Dockerfile
   - تحقق من Docker Hub credentials

### حلول سريعة:
```bash
# إعادة تشغيل workflow
# من GitHub Actions -> Re-run jobs

# تنظيف cache
# حذف node_modules و reinstall
```

## 📈 إحصائيات النشر

- **وقت البناء**: ~15-30 دقيقة
- **المنصات**: 5 منصات
- **التطبيقات**: 2 تطبيق
- **الخدمات**: 4 خدمات

## 🔗 روابط مفيدة

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Docker Hub](https://hub.docker.com/)

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من GitHub Actions logs
2. تأكد من صحة Secrets
3. تحقق من إعدادات المشروع
4. راجع التوثيق أعلاه

---

**تم إنشاء هذا النظام بواسطة Medical Lab Analyzer Team** 🏥