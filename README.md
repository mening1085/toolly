# toolly

เว็บแอปศูนย์รวมเครื่องมือช่วยชีวิตประจำวัน (Life Tools Hub)

## แนวคิด

"toolly" คือเว็บแอปที่รวมเครื่องมือสารพัดประโยชน์สำหรับชีวิตประจำวัน เช่น เครื่องมือด้านอาหาร, การเงิน, การตัดสินใจ, สุขภาพ ฯลฯ ในที่เดียว ใช้งานง่าย รวดเร็ว ไม่ต้องล็อกอิน รองรับมือถือและ PWA

## ฟีเจอร์หลัก

- รวมเครื่องมือหลายหมวด เช่น
  - วางแผนเมนูอาหารรายสัปดาห์
  - สุ่มอาหาร/กิจกรรม/สี/ชื่อเล่น
  - เครื่องคิดแคลอรี่
  - ตัวช่วยเลือกเมนูตามงบ
  - บันทึกรายรับรายจ่าย (Expense Tracker)
  - คำนวณดอกเบี้ยเงินกู้/บัตรเครดิต
  - เครื่องมือสุขภาพ (BMI, ดื่มน้ำ, ฯลฯ)
  - ตัวช่วยตัดสินใจ (random answer, wheel of names, rps)
- Responsive, Minimal UX/UI, รองรับ Dark Mode
- ข้อมูลสำคัญเก็บใน localStorage (ผ่าน Pinia persisted state)
- Export/Print ข้อมูลได้ (บางเครื่องมือ)
- รองรับ PWA (Add to Home Screen)
- ปิด pinch-zoom เพื่อ UX ที่ดีบนมือถือ

## เทคโนโลยี

- [Nuxt 3](https://nuxt.com/) + [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/) + pinia-plugin-persistedstate
- PWA (ผ่าน @vite-pwa/nuxt)

## โครงสร้างโปรเจกต์

- `pages/` : ไฟล์ .vue ของแต่ละเครื่องมือ
- `components/` : Navbar, Footer, FeatureCard ฯลฯ
- `stores/` : Pinia store (เช่น expenseStore)
- `assets/` : CSS, รูป
- `public/` : favicon, icon PWA
- `layouts/` : layout หลัก
- `plugins/` : Pinia persisted state (client-only)

## วิธีติดตั้งและใช้งาน

### ติดตั้ง dependencies

```bash
npm install
```

### รัน dev server

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Preview production

```bash
npm run preview
```

## ข้อควรทราบ

- ข้อมูลรายรับรายจ่ายและข้อมูลสำคัญอื่น ๆ จะถูกเก็บใน localStorage ของ browser (ไม่ sync ข้ามเครื่อง)
- หากลบ cache หรือเปลี่ยน browser ข้อมูลจะหาย
- รองรับการใช้งานแบบ PWA (Add to Home Screen)
- ปิด pinch-zoom เพื่อป้องกัน UX ผิดพลาดบนมือถือ

---

พัฒนาโดย [Nuxt 3 Minimal Starter]
