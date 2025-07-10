<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">💸 ตัวช่วยเลือกเมนูตามงบ</h1>
    <p class="mb-4">มีงบเท่าไหร่? ระบบแนะนำเมนูให้</p>
    <form @submit.prevent="findMenu" class="flex flex-col gap-3 mb-6">
      <div class="flex gap-2 items-center">
        <input
          v-model.number="budget"
          type="number"
          min="1"
          class="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="งบประมาณ (บาท)"
        />
        <select
          v-model="category"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">ทุกหมวดหมู่</option>
          <option value="อาหารไทย">อาหารไทย</option>
          <option value="Fast Food">Fast Food</option>
          <option value="บุฟเฟ่ต์">บุฟเฟ่ต์</option>
          <option value="ชาบู">ชาบู</option>
          <option value="หมูกระทะ">หมูกระทะ</option>
          <option value="อาหารจานเดียว">อาหารจานเดียว</option>
          <option value="กับข้าว">กับข้าว</option>
          <option value="เครื่องดื่ม">เครื่องดื่ม</option>
          <option value="ขนม">ขนม</option>
        </select>
        <button
          type="submit"
          class="ml-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-indigo-600 transition"
        >
          ค้นหา
        </button>
      </div>
    </form>
    <div v-if="menus.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(m, i) in menus"
        :key="i"
        class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center"
      >
        <img
          v-if="m.img"
          :src="m.img"
          :alt="m.name"
          class="w-20 h-20 object-cover rounded-full mb-2 border border-gray-200 dark:border-gray-700"
        />
        <div class="font-bold text-lg mb-1 text-center">
          {{ m.name
          }}<span v-if="m.en" class="block text-xs font-normal text-gray-400">{{
            m.en
          }}</span>
        </div>
        <div class="text-sm text-gray-500 mb-1">
          หมวดหมู่: {{ m.category || "-" }}
        </div>
        <div class="text-pink-500 font-bold text-lg">
          {{ m.price.toLocaleString() }} ฿
        </div>
      </div>
    </div>
    <div
      v-else-if="searched"
      class="text-center text-gray-400 dark:text-gray-500 mt-8"
    >
      ไม่พบเมนูที่ตรงกับงบประมาณนี้
    </div>
    <div v-else class="text-center text-gray-400 dark:text-gray-500 mt-8">
      กรอกงบประมาณและเลือกหมวดหมู่เพื่อค้นหาเมนู
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const foodDb = [
  {
    name: "ข้าวผัด",
    en: "Fried Rice",
    price: 50,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวมันไก่",
    en: "Hainanese Chicken Rice",
    price: 45,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวกะเพรา",
    en: "Basil Stir-fry Rice",
    price: 40,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวไข่เจียว",
    en: "Omelette Rice",
    price: 35,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวต้ม",
    en: "Rice Porridge",
    price: 30,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ส้มตำ",
    en: "Papaya Salad",
    price: 40,
    category: "อาหารไทย",
    img: "",
  },
  { name: "ผัดไทย", en: "Pad Thai", price: 55, category: "อาหารไทย", img: "" },
  {
    name: "ก๋วยเตี๋ยวเรือ",
    en: "Boat Noodles",
    price: 35,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวหมูแดง",
    en: "Red Pork Rice",
    price: 45,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวขาหมู",
    en: "Pork Leg Rice",
    price: 50,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวหน้าเป็ด",
    en: "Roast Duck Rice",
    price: 55,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวคลุกกะปิ",
    en: "Shrimp Paste Rice",
    price: 45,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวหมกไก่",
    en: "Chicken Biryani",
    price: 50,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวต้มปลา",
    en: "Fish Rice Porridge",
    price: 60,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวผัดปู",
    en: "Crab Fried Rice",
    price: 70,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ต้มยำกุ้ง",
    en: "Tom Yum Goong",
    price: 80,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "แกงเขียวหวาน",
    en: "Green Curry",
    price: 70,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "แกงส้ม",
    en: "Sour Curry",
    price: 60,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "แกงจืดเต้าหู้หมูสับ",
    en: "Clear Soup with Tofu",
    price: 50,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "หมูปิ้งข้าวเหนียว",
    en: "Grilled Pork with Sticky Rice",
    price: 30,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ลูกชิ้นปิ้ง",
    en: "Grilled Meatballs",
    price: 20,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ขนมจีนน้ำยา",
    en: "Rice Noodles with Curry",
    price: 40,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ข้าวโพดปิ้ง",
    en: "Grilled Corn",
    price: 20,
    category: "อาหารไทย",
    img: "",
  },
  {
    name: "ขนมเบื้อง",
    en: "Thai Crispy Pancake",
    price: 25,
    category: "อาหารไทย",
    img: "",
  },
  { name: "พิซซ่า", en: "Pizza", price: 120, category: "Fast Food", img: "" },
  {
    name: "เฟรนช์ฟรายส์",
    en: "French Fries",
    price: 45,
    category: "Fast Food",
    img: "",
  },
  {
    name: "เบอร์เกอร์",
    en: "Burger",
    price: 89,
    category: "Fast Food",
    img: "",
  },
  {
    name: "นักเก็ตไก่",
    en: "Chicken Nuggets",
    price: 49,
    category: "Fast Food",
    img: "",
  },
  {
    name: "ไก่ทอด",
    en: "Fried Chicken",
    price: 40,
    category: "Fast Food",
    img: "",
  },
  { name: "ฮอทด็อก", en: "Hot Dog", price: 39, category: "Fast Food", img: "" },
  { name: "ซูชิ", en: "Sushi", price: 15, category: "Fast Food", img: "" },
  {
    name: "สลัดโรล",
    en: "Salad Roll",
    price: 35,
    category: "Fast Food",
    img: "",
  },
  { name: "ชาบูหมู", en: "Shabu Pork", price: 299, category: "ชาบู", img: "" },
  {
    name: "ชาบูเนื้อ",
    en: "Shabu Beef",
    price: 399,
    category: "ชาบู",
    img: "",
  },
  {
    name: "ชาบูซีฟู้ด",
    en: "Shabu Seafood",
    price: 350,
    category: "ชาบู",
    img: "",
  },
  {
    name: "หมูกระทะ",
    en: "Moo Krata",
    price: 199,
    category: "หมูกระทะ",
    img: "",
  },
  {
    name: "หมูกระทะพรีเมียม",
    en: "Premium Moo Krata",
    price: 399,
    category: "หมูกระทะ",
    img: "",
  },
  {
    name: "หมูกระทะเด็ก",
    en: "Kids Moo Krata",
    price: 99,
    category: "หมูกระทะ",
    img: "",
  },
  {
    name: "บุฟเฟ่ต์ปิ้งย่าง",
    en: "BBQ Buffet",
    price: 499,
    category: "บุฟเฟ่ต์",
    img: "",
  },
  {
    name: "บุฟเฟ่ต์ชาบู",
    en: "Shabu Buffet",
    price: 399,
    category: "บุฟเฟ่ต์",
    img: "",
  },
  {
    name: "บุฟเฟ่ต์ซีฟู้ด",
    en: "Seafood Buffet",
    price: 599,
    category: "บุฟเฟ่ต์",
    img: "",
  },
  {
    name: "บุฟเฟ่ต์ซูชิ",
    en: "Sushi Buffet",
    price: 499,
    category: "บุฟเฟ่ต์",
    img: "",
  },
  { name: "ขนมปังปิ้ง", en: "Toast", price: 20, category: "ขนม", img: "" },
  {
    name: "ขนมครก",
    en: "Thai Coconut Pancake",
    price: 25,
    category: "ขนม",
    img: "",
  },
  { name: "บัวลอย", en: "Bua Loy", price: 30, category: "ขนม", img: "" },
  { name: "ลอดช่อง", en: "Lod Chong", price: 25, category: "ขนม", img: "" },
  {
    name: "ข้าวเหนียวมะม่วง",
    en: "Mango Sticky Rice",
    price: 50,
    category: "ขนม",
    img: "",
  },
  {
    name: "ชาไทย",
    en: "Thai Tea",
    price: 25,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "กาแฟเย็น",
    en: "Iced Coffee",
    price: 30,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "น้ำอัดลม",
    en: "Soft Drink",
    price: 15,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "น้ำเปล่า",
    en: "Water",
    price: 10,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "น้ำผลไม้",
    en: "Fruit Juice",
    price: 25,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "นมสด",
    en: "Fresh Milk",
    price: 20,
    category: "เครื่องดื่ม",
    img: "",
  },
];

const budget = ref<number | null>(null);
const category = ref("");
const menus = ref<typeof foodDb>([]);
const searched = ref(false);

function findMenu() {
  searched.value = true;
  if (!budget.value || budget.value < 1) {
    menus.value = [];
    return;
  }
  menus.value = foodDb.filter(
    (m) =>
      m.price <= budget.value! &&
      (!category.value || m.category === category.value)
  );
}
</script>
