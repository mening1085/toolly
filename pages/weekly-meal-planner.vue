<template>
  <div class="max-w-2xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🗓️ วางแผนเมนูอาหารรายสัปดาห์</h1>
    <p class="mb-4">เครื่องมือช่วยจัดเมนูแบบง่าย ๆ + export ไปซื้อของได้</p>
    <div class="overflow-x-auto">
      <table
        class="min-w-full border rounded-lg bg-white dark:bg-gray-900 shadow"
      >
        <thead>
          <tr>
            <th class="p-2 border-b text-center bg-gray-100 dark:bg-gray-800">
              วัน/มื้อ
            </th>
            <th class="p-2 border-b text-center">เช้า</th>
            <th class="p-2 border-b text-center">กลางวัน</th>
            <th class="p-2 border-b text-center">เย็น</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(day, i) in days" :key="day">
            <td
              class="p-2 border-b text-center font-semibold bg-gray-50 dark:bg-gray-800"
            >
              {{ day }}
            </td>
            <td class="p-2 border-b">
              <input
                v-model="meals[i].breakfast"
                type="text"
                class="w-full rounded border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="เมนูเช้า"
              />
            </td>
            <td class="p-2 border-b">
              <input
                v-model="meals[i].lunch"
                type="text"
                class="w-full rounded border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="เมนูกลางวัน"
              />
            </td>
            <td class="p-2 border-b">
              <input
                v-model="meals[i].dinner"
                type="text"
                class="w-full rounded border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="เมนูเย็น"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-wrap gap-2 mt-6 justify-center print:hidden">
      <button
        @click="randomizeAll"
        class="px-4 py-2 rounded bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-indigo-600 transition"
      >
        สุ่มเมนูทั้งสัปดาห์
      </button>
      <button
        @click="clearAll"
        class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ล้างทั้งหมด
      </button>
      <button
        @click="exportPlan"
        class="px-4 py-2 rounded bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
      >
        Export รายการ
      </button>
      <button
        @click="printPlan"
        class="px-4 py-2 rounded bg-yellow-400 text-gray-900 font-bold shadow hover:bg-yellow-500 transition"
      >
        Print
      </button>
    </div>
    <div class="text-xs text-gray-500 mt-4 text-center">
      * สามารถกรอกเองหรือกดสุ่มเมนูได้
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";

const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];

interface Meal {
  breakfast: string;
  lunch: string;
  dinner: string;
}

const meals = ref<Meal[]>(
  Array.from({ length: 7 }, () => ({ breakfast: "", lunch: "", dinner: "" }))
);

const defaultMenus = [
  "ข้าวผัด",
  "ผัดกะเพรา",
  "ต้มยำกุ้ง",
  "ข้าวมันไก่",
  "ส้มตำ",
  "ข้าวหมูแดง",
  "ข้าวขาหมู",
  "ข้าวต้มปลา",
  "ข้าวหน้าปลาแซลมอน",
  "ราเมง",
  "ซูชิ",
  "ข้าวแกงกะหรี่",
  "หมูปิ้งข้าวเหนียว",
  "ข้าวไข่เจียว",
  "ก๋วยเตี๋ยวเรือ",
];

function randomMenu() {
  return defaultMenus[Math.floor(Math.random() * defaultMenus.length)];
}

function randomizeAll() {
  meals.value = meals.value.map(() => ({
    breakfast: randomMenu(),
    lunch: randomMenu(),
    dinner: randomMenu(),
  }));
}

function clearAll() {
  meals.value = meals.value.map(() => ({
    breakfast: "",
    lunch: "",
    dinner: "",
  }));
}

function exportPlan() {
  // สร้างข้อมูลสำหรับ export
  const data = meals.value.map((meal: Meal, i: number) => ({
    วัน: days[i],
    เช้า: meal.breakfast,
    กลางวัน: meal.lunch,
    เย็น: meal.dinner,
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Meal Plan");
  XLSX.writeFile(wb, "weekly-meal-plan.xlsx");
}

function printPlan() {
  window.print();
}
</script>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }
}
</style>
