# Ben Musa PWA

یک Progressive Web App آماده انتشار برای برند Ben Musa، ساخته‌شده با React, Vite, Tailwind CSS, Framer Motion, Lucide Icons و i18next.

## امکانات

- طراحی لوکس، واکنش‌گرا و موبایل‌فرست برای خدمات حج و عمره.
- پشتیبانی فارسی، عربی و انگلیسی با RTL/LTR.
- معماری content-driven با فایل‌های JSON:
  - `public/data/products.json`
  - `public/data/content.json`
- پنل مخفی مدیریت در مسیر `/admin`.
- مدیریت محصولات، متن‌ها، عنوان‌ها، اطلاعات تماس، SEO، لوگو و URL تصاویر.
- خروجی گرفتن از فایل‌های به‌روزشده `products.json` و `content.json`.
- PWA کامل با manifest، service worker، آیکن، نصب روی موبایل و پشتیبانی آفلاین.
- آماده برای GitHub Pages.

## اجرای محلی

```bash
npm install
npm run dev
```

سایت:

```text
http://localhost:5173/benmusa/
```

پنل مدیریت:

```text
http://localhost:5173/benmusa/admin
```

## Build نهایی

```bash
npm run build
npm run preview
```

## انتشار در GitHub Pages

پروژه الان برای ریپازیتوری با نام `benmusa` تنظیم شده است.

1. در GitHub یک repository با نام `benmusa` بساز.
2. فایل‌های همین پروژه را داخل ریپازیتوری قرار بده.
3. این دستورها را اجرا کن:

```bash
npm install
npm run deploy
```

4. در GitHub برو به:

```text
Settings > Pages
```

و مطمئن شو branch صفحه روی `gh-pages` قرار دارد.

آدرس نهایی شبیه این می‌شود:

```text
https://YOUR_GITHUB_USERNAME.github.io/benmusa/
```

اگر اسم ریپازیتوری را عوض کردی، باید این مسیرها را هم با همان نام هماهنگ کنی:

- `vite.config.js` مقدار `base`
- `package.json` مقدار `homepage`
- `index.html`
- `public/manifest.webmanifest`
- `public/service-worker.js`
- `public/404.html`
- `src/main.jsx`

## کار با پنل ادمین

پنل بک‌اند ندارد و برای GitHub Pages کاملا استاتیک است.

1. وارد `/admin` شو.
2. از تب `Content & Images` متن‌ها، عنوان‌ها، SEO، تماس، لوگو و URL تصاویر را تغییر بده.
3. از تب `Products` محصول اضافه، ویرایش یا حذف کن.
4. خروجی بگیر:
   - `Export content.json`
   - `Export products.json`
5. فایل‌های خروجی را جایگزین این فایل‌ها کن:
   - `public/data/content.json`
   - `public/data/products.json`
6. دوباره build و deploy بگیر.

## آماده برای GitHub API

لایه سرویس جدا شده است:

- `src/services/contentService.js`
- `src/services/productService.js`

در آینده می‌توان ذخیره مستقیم روی GitHub را داخل همین سرویس‌ها اضافه کرد، بدون بازنویسی UI.
