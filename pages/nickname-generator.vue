<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🐶 ตั้งชื่อเล่น/สัตว์เลี้ยง</h1>
    <p class="mb-4">สุ่มชื่อเล่น/สัตว์เลี้ยง 50 ชื่อ (ไทย อังกฤษ หรืออื่น ๆ)</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <button
        @click="randomize"
        class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
      >
        สุ่มชื่อใหม่
      </button>
      <div
        v-if="names.length"
        class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 w-full"
      >
        <div
          v-for="(n, i) in names"
          :key="i"
          class="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-center font-bold shadow border border-indigo-200 dark:border-indigo-700 text-sm"
        >
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const allNames = [
  "มะลิ",
  "ข้าวปั้น",
  "ซูชิ",
  "ไข่ตุ๋น",
  "ป๊อป",
  "โบโบ้",
  "น้ำตาล",
  "ข้าวฟ่าง",
  "ข้าวโพด",
  "ข้าวเหนียว",
  "Snowy",
  "Milo",
  "Coco",
  "Bella",
  "Luna",
  "Rocky",
  "Lucky",
  "Leo",
  "Mochi",
  "Mimi",
  "Pumpkin",
  "Cookie",
  "Peach",
  "Tiger",
  "Shadow",
  "Sunny",
  "Sky",
  "Storm",
  "Maple",
  "Olive",
  "Biscuit",
  "Pudding",
  "Honey",
  "Cherry",
  "Mint",
  "BamBam",
  "Bobo",
  "Nana",
  "Mango",
  "Mocha",
  "Sushi",
  "Panda",
  "Bear",
  "Wolf",
  "Fox",
  "Rabbit",
  "Hammy",
  "Choco",
  "Latte",
  "Brownie",
  "ซันนี่",
  "สายไหม",
  "น้ำแข็ง",
  "ข้าวจ้าว",
  "ข้าวกล้อง",
  "ข้าวสวย",
  "ข้าวจี่",
  "ข้าวตัง",
  "ข้าวเม่า",
  "ข้าวหอม",
  "จิ๋ว",
  "จ๋า",
  "จ๋อม",
  "จ๋าย",
  "จ๋อง",
  "จ๋อมแจ๋ม",
  "จ๋อมแจ๋",
  "จ๋อมแจ๋ว",
  "จ๋อมแจ๋วแหวว",
  "จ๋อมแจ๋วแวว",
  "Bunny",
  "Kitty",
  "Doggy",
  "Birdy",
  "Fishy",
  "Hamster",
  "Turtle",
  "Foxy",
  "Wolfy",
  "BearBear",
];
const names = ref<string[]>([]);
function randomize() {
  names.value = allNames.sort(() => 0.5 - Math.random()).slice(0, 50);
}
randomize();
</script>
