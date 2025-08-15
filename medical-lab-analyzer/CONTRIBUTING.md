# دليل المساهمة

شكراً لاهتمامك بالمساهمة في تطوير نظام التحليل الطبي المختبري! هذا الدليل سيساعدك على البدء في المساهمة.

## كيفية المساهمة

### 1. إعداد البيئة المحلية

#### المتطلبات الأساسية
- Node.js 18+
- npm أو yarn
- Git

#### خطوات الإعداد
```bash
# استنساخ المشروع
git clone https://github.com/your-username/medical-lab-analyzer.git
cd medical-lab-analyzer

# تثبيت التبعيات
npm install

# إعداد قاعدة البيانات
npm run db:setup

# تشغيل التطبيق
npm run dev
```

### 2. اختيار مهمة للمساهمة

#### أنواع المساهمات المطلوبة
- 🐛 إصلاح الأخطاء
- ✨ إضافة ميزات جديدة
- 📚 تحسين التوثيق
- 🎨 تحسين واجهة المستخدم
- ⚡ تحسين الأداء
- 🔒 تحسين الأمان
- 🧪 إضافة اختبارات

#### العثور على مهام متاحة
- تحقق من [Issues](https://github.com/your-username/medical-lab-analyzer/issues)
- ابحث عن issues مع علامة "good first issue" للمبتدئين
- ابحث عن issues مع علامة "help wanted" للمساعدة المطلوبة

### 3. إنشاء فرع جديد

```bash
# التأكد من تحديث الفرع الرئيسي
git checkout main
git pull origin main

# إنشاء فرع جديد
git checkout -b feature/your-feature-name
# أو
git checkout -b fix/your-bug-fix
```

#### تسمية الفروع
- `feature/` للميزات الجديدة
- `fix/` لإصلاح الأخطاء
- `docs/` للتوثيق
- `refactor/` لإعادة هيكلة الكود
- `test/` للاختبارات

### 4. تطوير الميزة

#### معايير الكود
- استخدم TypeScript لجميع الملفات الجديدة
- اتبع معايير ESLint و Prettier
- اكتب تعليقات واضحة باللغة العربية
- استخدم أسماء متغيرات ووظائف واضحة

#### هيكل الملفات
```
src/
├── app/                    # صفحات التطبيق
├── components/             # مكونات React
│   ├── ui/                # مكونات واجهة المستخدم الأساسية
│   ├── forms/             # نماذج الإدخال
│   └── dashboard/         # مكونات لوحة التحكم
├── lib/                   # المكتبات والأدوات
├── types/                 # أنواع TypeScript
└── utils/                 # الدوال المساعدة
```

#### معايير التصميم
- استخدم Tailwind CSS للأنماط
- اتبع نظام التصميم المحدد
- تأكد من التجاوب مع جميع الأجهزة
- دعم RTL للغة العربية

### 5. الاختبار

#### تشغيل الاختبارات
```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch

# تشغيل الاختبارات مع تغطية
npm run test:coverage
```

#### اختبار يدوي
- اختبر الميزة في المتصفح
- تأكد من عملها على أجهزة مختلفة
- اختبر الحالات الاستثنائية

### 6. الالتزام بالتغييرات

```bash
# إضافة الملفات
git add .

# الالتزام بالتغييرات
git commit -m "feat: إضافة ميزة تحليل الصور المتقدمة

- إضافة خوارزمية جديدة لتحليل الخلايا
- تحسين دقة التحليل بنسبة 15%
- إضافة واجهة مستخدم محسنة
- إضافة اختبارات شاملة

Closes #123"
```

#### معايير رسائل الالتزام
استخدم [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` للميزات الجديدة
- `fix:` لإصلاح الأخطاء
- `docs:` للتوثيق
- `style:` لتغييرات التنسيق
- `refactor:` لإعادة هيكلة الكود
- `test:` للاختبارات
- `chore:` للمهام الروتينية

### 7. فتح Pull Request

#### قبل فتح PR
- تأكد من تشغيل جميع الاختبارات
- تأكد من عدم وجود أخطاء في ESLint
- تأكد من تنسيق الكود مع Prettier
- اكتب وصف واضح للـ PR

#### قالب Pull Request
```markdown
## الوصف
وصف مختصر للتغييرات المضافة

## نوع التغيير
- [ ] إصلاح خطأ
- [ ] ميزة جديدة
- [ ] تحسين التوثيق
- [ ] تحسين واجهة المستخدم
- [ ] تحسين الأداء
- [ ] تحسين الأمان

## الاختبارات
- [ ] تم تشغيل الاختبارات المحلية
- [ ] تم اختبار الميزة يدوياً
- [ ] لا توجد أخطاء في ESLint

## لقطات الشاشة (إن وجدت)
أضف لقطات شاشة للميزات الجديدة

## معلومات إضافية
أي معلومات إضافية مفيدة

Closes #رقم_المشكلة
```

### 8. مراجعة الكود

#### معايير المراجعة
- الكود واضح ومقروء
- يتبع معايير المشروع
- يحتوي على اختبارات مناسبة
- التوثيق محدث
- لا يسبب مشاكل في الأداء

## معايير الكود

### TypeScript
```typescript
// استخدم أنواع واضحة
interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
}

// استخدم async/await بدلاً من Promises
async function fetchPatient(id: string): Promise<Patient> {
  const response = await fetch(`/api/patients/${id}`);
  return response.json();
}
```

### React Components
```typescript
// استخدم functional components مع hooks
import { useState, useEffect } from 'react';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Partial<Patient>) => void;
}

export default function PatientForm({ patient, onSubmit }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    // ...
  });

  // ...
}
```

### CSS/Tailwind
```css
/* استخدم Tailwind CSS classes */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">عنوان</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    زر
  </button>
</div>
```

## الحصول على المساعدة

إذا واجهت أي مشاكل أو لديك أسئلة:

1. تحقق من [الوثائق](README.md)
2. ابحث في [Issues](https://github.com/your-username/medical-lab-analyzer/issues)
3. ابحث في [Discussions](https://github.com/your-username/medical-lab-analyzer/discussions)
4. أنشئ issue جديد إذا لم تجد إجابة

## الاعتراف

سيتم إضافة جميع المساهمين إلى ملف [CONTRIBUTORS.md](CONTRIBUTORS.md) في المشروع.

---

شكراً لمساهمتك في تطوير نظام التحليل الطبي المختبري! 🎉