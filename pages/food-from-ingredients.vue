<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🍳 สุ่มเมนูจากวัตถุดิบ</h1>
    <p class="mb-4">กรอกวัตถุดิบที่มี ระบบแนะนำเมนูให้</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <textarea
        v-model="input"
        rows="2"
        class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400"
        placeholder="เช่น ไข่, ข้าว, หมู, ผัก"
      ></textarea>
      <button
        @click="randomize"
        class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold text-lg shadow transition"
      >
        สุ่มเมนู
      </button>
      <div v-if="result" class="mt-4 text-center">
        <div class="text-2xl font-bold mb-2">{{ result }}</div>
        <button
          class="mt-2 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          ดูวิธีทำ (mockup)
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const input = ref("");
const result = ref("");
const menus = [
  "ข้าวผัดไข่",
  "ไข่เจียวหมูสับ",
  "ต้มจืดผักกาดขาว",
  "ข้าวต้มหมู",
  "ผัดผักรวม",
  "ข้าวผัดหมู",
  "ไข่ต้ม",
  "ข้าวผัดผัก",
  "แกงจืดเต้าหู้",
  "ข้าวผัดกุ้ง",
];
function randomize() {
  result.value = menus[Math.floor(Math.random() * menus.length)];
}
</script>
