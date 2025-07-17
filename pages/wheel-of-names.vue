<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🎡 วงล้อสุ่ม (Wheel of Names)</h1>
    <p class="mb-4">สำหรับสุ่มชื่อคน, ของกิน, งานที่ต้องทำ ฯลฯ</p>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
      <label class="block mb-1 font-medium"
        >กรอกรายชื่อหรือรายการ (คั่นแต่ละรายการด้วย , หรือ Enter)</label
      >
      <textarea
        v-model="inputList"
        rows="3"
        class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400"
        placeholder="เช่น ก้อย, โจ้, ตั้ม หรือ ข้าวมันไก่, ข้าวผัด, ส้มตำ"
      ></textarea>
      <div class="text-xs text-gray-500 mt-1">
        จะใช้เฉพาะรายการที่กรอกนี้ในการสุ่ม
      </div>
      <div class="flex flex-col items-center gap-4 mt-4">
        <button
          @click="spinWheel"
          class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
        >
          <span v-if="!isSpinning">หมุนวงล้อสุ่ม</span>
          <span v-else class="animate-pulse">กำลังหมุน...</span>
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
              @click="spinWheel"
              class="mt-2 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              สุ่มใหม่
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputList = ref("");
const result = ref("");
const isSpinning = ref(false);

function getList(): string[] {
  return inputList.value
    .split(/,|\n/)
    .map((s: string) => s.trim())
    .filter(Boolean);
}

function spinWheel() {
  const pool = getList();
  if (pool.length === 0) {
    result.value = "กรุณากรอกอย่างน้อย 1 รายการ";
    return;
  }
  isSpinning.value = true;
  setTimeout(() => {
    const idx = Math.floor(Math.random() * pool.length);
    result.value = pool[idx];
    isSpinning.value = false;
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
