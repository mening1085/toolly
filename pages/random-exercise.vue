<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🏋️ สุ่มท่าออกกำลังกาย</h1>
    <p class="mb-4">สำหรับคนอยากฟิต แต่เบื่อ routine เดิม</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <button
        @click="randomize"
        class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
      >
        <span v-if="!isAnimating">สุ่มท่าออกกำลังกาย</span>
        <span v-else class="animate-pulse">กำลังสุ่ม...</span>
      </button>
      <transition name="pop">
        <div v-if="result" class="text-center mt-6">
          <div
            class="text-3xl font-extrabold mb-2 text-indigo-600 dark:text-indigo-300 animate-bounce"
            :key="result"
          >
            <span
              class="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg border border-indigo-200 dark:border-indigo-700"
            >
              {{ result }}
            </span>
          </div>
          <button
            @click="randomize"
            class="mt-2 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            สุ่มใหม่
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const exercises = [
  "🏃‍♂️ วิ่งจ๊อกกิ้ง",
  "🧘‍♀️ โยคะ",
  "🏋️‍♂️ ยกเวท",
  "🚴‍♂️ ปั่นจักรยาน",
  "🤸‍♂️ กระโดดตบ",
  "🧎‍♂️ วิดพื้น",
  "🦵 สควอท",
  "🦶 กระโดดเชือก",
  "🧗‍♂️ ปีนเขา",
  "🏊‍♂️ ว่ายน้ำ",
  "🧍‍♂️ แพลงก์",
  "🦶 ลันจ์",
  "🦵 ขึ้นบันได",
  "🤾‍♂️ บอดี้เวท",
  "🧘‍♂️ ยืดกล้ามเนื้อ",
  "🤽‍♂️ ว่ายน้ำท่าผีเสื้อ",
  "🏸 ตีแบด",
  "🏓 ปิงปอง",
  "🏀 บาสเกตบอล",
  "⚽ ฟุตบอล",
  "🏐 วอลเลย์บอล",
  "🏏 คริกเก็ต",
  "🏈 อเมริกันฟุตบอล",
  "🥊 ชกมวย",
  "🤼‍♂️ มวยปล้ำ",
  "🤹‍♂️ ฝึกสมาธิ/บาลานซ์",
];
const result = ref("");
const isAnimating = ref(false);
function randomize() {
  isAnimating.value = true;
  setTimeout(() => {
    const idx = Math.floor(Math.random() * exercises.length);
    result.value = exercises[idx];
    isAnimating.value = false;
  }, 700);
}
</script>
<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 2, 0.6, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.pop-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
