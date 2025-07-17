<script setup lang="ts">
import { ref, computed } from "vue";

const filter = ref("all");
const search = ref("");

const categories = [
  { value: "all", label: "ทั้งหมด", icon: "🌟" },
  { value: "food", label: "อาหาร", icon: "🥘" },
  { value: "money", label: "เงิน", icon: "💸" },
  { value: "decision", label: "สุ่ม/ตัดสินใจ", icon: "🎯" },
  { value: "health", label: "สุขภาพ", icon: "💪" },
  { value: "other", label: "อื่น ๆ", icon: "📦" },
];

const features = [
  // 🍽️ ด้านอาหาร / กินอะไรดี
  {
    icon: "🎲",
    title: "สุ่มอาหาร",
    description:
      "ไม่รู้จะกินอะไร? ให้ระบบสุ่มชื่อเมนูให้ (เลือกได้: ไทย/ญี่ปุ่น/สตรีทฟู้ด)",
    to: "/food-randomizer",
    category: "food",
  },
  {
    icon: "🗓️",
    title: "วางแผนเมนูรายสัปดาห์",
    description: "ช่วยจัดเมนู + export ไปซื้อของได้",
    to: "/weekly-meal-planner",
    category: "food",
  },
  {
    icon: "🔥",
    title: "คิดแคลอรี่เบื้องต้น",
    description: "กรอกเมนูแล้วดูว่าได้กี่แคลอรี่โดยประมาณ",
    to: "/food-calorie",
    category: "food",
  },
  {
    icon: "💸",
    title: "เลือกเมนูตามงบ",
    description: "มีงบเท่าไหร่? ระบบแนะนำเมนูให้",
    to: "/food-budget",
    category: "food",
  },
  {
    icon: "🍳",
    title: "สุ่มเมนูจากวัตถุดิบ",
    description: "กรอกวัตถุดิบที่มี ระบบแนะนำเมนูให้",
    to: "/food-from-ingredients",
    category: "food",
  },
  {
    icon: "💰",
    title: "คำนวณต้นทุนอาหาร/สูตร",
    description: "คำนวณต้นทุนต่อจานและกำไร",
    to: "/food-cost",
    category: "food",
  },
  // 💰 ด้านเงิน / คำนวณ / การใช้จ่าย
  {
    icon: "🧾",
    title: "หารบิลกลุ่ม (Split Bill)",
    description: "สำหรับเพื่อน ๆ ที่ออกเงินคนละจำนวน",
    to: "/split-bill",
    category: "money",
  },
  {
    icon: "📈",
    title: "คำนวณดอกเบี้ยเงินกู้/บัตรเครดิต",
    description: "เข้าใจหนี้ง่ายขึ้น",
    to: "/loan-interest",
    category: "money",
  },
  {
    icon: "📒",
    title: "บันทึกรายรับรายจ่าย",
    description: "ใช้งานไว ไม่ต้องล็อกอิน",
    to: "/expense-tracker",
    category: "money",
  },
  {
    icon: "🎯",
    title: "วางแผนเงินเก็บตามเป้าหมาย",
    description: "อยากเก็บ 50,000 ใน 6 เดือน ต้องเก็บเดือนละเท่าไร?",
    to: "/saving-goal",
    category: "money",
  },
  {
    icon: "🎁",
    title: "คำนวณหารเงินของขวัญ/ของใช้",
    description: "แบ่งเงินซื้อของขวัญรวมกัน",
    to: "/gift-split",
    category: "money",
  },
  {
    icon: "📊",
    title: "บันทึกเงินออม + กราฟ",
    description: "บันทึกเงินออมรายวัน/เดือน พร้อมกราฟ",
    to: "/saving-tracker",
    category: "money",
  },
  // 🧠 ด้านการตัดสินใจ / เลือกไม่ได้
  {
    icon: "🎡",
    title: "วงล้อสุ่ม (Wheel of Names)",
    description: "สุ่มชื่อคน, ของกิน, งาน ฯลฯ",
    to: "/wheel-of-names",
    category: "decision",
  },
  {
    icon: "✌️",
    title: "เป่ายิ้งฉุบออนไลน์",
    description: "ใช้ตัดสินใจกับเพื่อน ๆ ได้",
    to: "/rps",
    category: "decision",
  },
  {
    icon: "🎲",
    title: "สุ่มคำตอบ (ใช่/ไม่ใช่)",
    description: "ตลก ๆ สำหรับคนลังเล",
    to: "/random-answer",
    category: "decision",
  },
  {
    icon: "🎨",
    title: "สุ่มสี / โทนสี",
    description: "เลือกธีมหรือไอเดียสำหรับออกแบบ",
    to: "/random-color",
    category: "decision",
  },
  {
    icon: "💡",
    title: "สุ่มไอเดียกิจกรรมวันหยุด",
    description: "ไม่รู้จะทำอะไรดี? ให้ AI แนะนำ",
    to: "/random-activity",
    category: "decision",
  },
  {
    icon: "🔥",
    title: "คำนวณแคลอรี่ที่ควรได้รับ (BMR/TDEE)",
    description: "คำนวณพลังงานที่ควรได้รับต่อวัน",
    to: "/bmr-tdee",
    category: "health",
  },
  {
    icon: "📉",
    title: "บันทึกน้ำหนัก/สุขภาพ",
    description: "บันทึกน้ำหนัก/รอบเอว + กราฟ",
    to: "/weight-tracker",
    category: "health",
  },
  {
    icon: "📅",
    title: "Habit Tracker",
    description: "ติดตามนิสัย/กิจกรรมที่อยากทำ",
    to: "/habit-tracker",
    category: "health",
  },
  {
    icon: "🎯",
    title: "Random Focus Task",
    description: "สุ่มงานที่ควรโฟกัสวันนี้",
    to: "/focus-task",
    category: "other",
  },
  {
    icon: "🎁",
    title: "จับฉลาก/จับสลากของรางวัล",
    description: "กรอกชื่อผู้เข้าร่วมแล้วจับฉลาก",
    to: "/raffle",
    category: "decision",
  },
  {
    icon: "🎂",
    title: "คำนวณอายุ/วันครบรอบ",
    description: "คำนวณอายุ/วันครบรอบจากวันเกิด",
    to: "/age-anniversary",
    category: "other",
  },
  {
    icon: "💱",
    title: "แปลงสกุลเงิน",
    description: "Currency Converter อัปเดตเรตอัตโนมัติ",
    to: "/currency-converter",
    category: "money",
  },
  {
    icon: "🧾",
    title: "คำนวณภาษี/ประกันสังคม",
    description: "คำนวณภาษีและเงินสมทบ",
    to: "/tax-social-security",
    category: "money",
  },
  {
    icon: "🗒️",
    title: "Sticky Note/บันทึกโน้ต",
    description: "โน้ตสั้น ๆ ลากวางได้",
    to: "/sticky-note",
    category: "other",
  },
  {
    icon: "🔗",
    title: "แชร์ผลลัพธ์/Export PDF/CSV",
    description: "แชร์หรือ export ข้อมูลจากแต่ละหน้า",
    to: "/export-share",
    category: "other",
  },
  {
    icon: "💬",
    title: "Random Quote/คำคม",
    description: "สุ่มคำคมประจำวัน ไทย/อังกฤษ",
    to: "/random-quote",
    category: "other",
  },
  {
    icon: "🎲",
    title: "Truth or Dare/บทลงโทษ",
    description: "เกมสุ่มโจทย์/บทลงโทษ",
    to: "/truth-or-dare",
    category: "decision",
  },
  {
    icon: "📏",
    title: "ตัวแปลงหน่วย",
    description: "เช่น เซนติเมตรเป็นนิ้ว",
    to: "/unit-converter",
    category: "other",
  },
  {
    icon: "🔑",
    title: "Random password generator",
    description: "สร้างรหัสผ่านสุ่ม",
    to: "/password-generator",
    category: "other",
  },
  {
    icon: "📅",
    title: "นับวันระหว่าง 2 วัน",
    description: "คำนวณจำนวนวัน",
    to: "/date-diff",
    category: "other",
  },
  {
    icon: "🐶",
    title: "ตั้งชื่อเล่น/สัตว์เลี้ยง",
    description: "ช่วยคิดชื่อเล่น/สัตว์เลี้ยง",
    to: "/nickname-generator",
    category: "other",
  },
  {
    icon: "📝",
    title: "To-do list รายวัน",
    description: "To-do list รายวันแบบ minimal",
    to: "/todo",
    category: "other",
  },
];

const filteredFeatures = computed(() => {
  return features.filter((f) => {
    const matchCategory = filter.value === "all" || f.category === filter.value;
    const q = search.value.trim().toLowerCase();
    const matchSearch =
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6"
    >
      <ul class="flex gap-2 sm:gap-4 text-sm font-medium flex-wrap">
        <li v-for="cat in categories" :key="cat.value">
          <button
            class="px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            :class="{
              'bg-blue-500 text-white dark:bg-blue-600': filter === cat.value,
            }"
            @click="filter = cat.value"
          >
            <span>{{ cat.icon }}</span>
            <span class="hidden sm:inline">{{ cat.label }}</span>
          </button>
        </li>
      </ul>
      <input
        v-model="search"
        type="text"
        placeholder="ค้นหาเครื่องมือ..."
        class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-40 sm:w-56"
      />
    </div>
    <div
      v-if="filteredFeatures.length === 0"
      class="text-center text-gray-500 py-12"
    >
      ไม่พบเครื่องมือที่ตรงกับคำค้นหา
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FeatureCard v-for="f in filteredFeatures" :key="f.to" v-bind="f" />
    </div>
  </div>
</template>
