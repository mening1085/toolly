<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">💧 เตือนดื่มน้ำ</h1>
    <p class="mb-4">
      เครื่องมือเตือนดื่มน้ำ – ตั้งเวลาง่าย ๆ ให้เตือนทุก X นาที
    </p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <div class="flex items-center gap-2 mb-2">
        <label class="text-sm">เตือนทุก</label>
        <input
          type="number"
          min="5"
          max="180"
          v-model.number="interval"
          class="w-16 rounded border border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-900 text-center"
        />
        <span class="text-sm">นาที</span>
      </div>
      <div class="text-4xl font-mono font-extrabold mb-2 select-none">
        {{ mm }}:{{ ss }}
      </div>
      <div class="flex gap-2">
        <button
          @click="toggle"
          class="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-400 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
        >
          {{ running ? "หยุด" : "เริ่ม" }}
        </button>
        <button
          @click="reset"
          class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
        >
          รีเซ็ต
        </button>
      </div>
      <div
        v-if="showAlert"
        class="mt-4 px-4 py-2 rounded bg-green-500 text-white font-bold animate-bounce"
      >
        ถึงเวลาดื่มน้ำแล้ว!
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
const interval = ref(60);
const time = ref(interval.value * 60);
const running = ref(false);
const showAlert = ref(false);
let timer: number | undefined;
const mm = computed(() => String(Math.floor(time.value / 60)).padStart(2, "0"));
const ss = computed(() => String(time.value % 60).padStart(2, "0"));
function toggle() {
  running.value = !running.value;
  if (running.value) startTimer();
  else clearTimer();
}
function startTimer() {
  clearTimer();
  time.value = interval.value * 60;
  timer = window.setInterval(() => {
    if (time.value > 0) time.value--;
    else {
      running.value = false;
      showAlert.value = true;
      clearTimer();
      setTimeout(() => (showAlert.value = false), 3000);
    }
  }, 1000);
}
function clearTimer() {
  if (timer) clearInterval(timer);
  timer = undefined;
}
function reset() {
  time.value = interval.value * 60;
  running.value = false;
  showAlert.value = false;
  clearTimer();
}
onUnmounted(() => {
  clearTimer();
});
</script>
