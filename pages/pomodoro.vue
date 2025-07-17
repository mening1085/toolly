<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">⏲️ Pomodoro Timer</h1>
    <p class="mb-4">25 นาทีทำงาน / 5 นาทีพัก</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <div class="flex gap-2 mb-2">
        <button
          v-for="m in modes"
          :key="m.value"
          @click="setMode(m.value)"
          :class="[
            'px-4 py-2 rounded-xl font-bold transition',
            mode === m.value
              ? 'bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white scale-105 shadow'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
          ]"
        >
          {{ m.label }}
        </button>
      </div>
      <div class="flex gap-4 mb-2 w-full justify-center">
        <div
          v-for="m in modes"
          :key="'input-' + m.value"
          class="flex items-center gap-1"
        >
          <label class="text-xs">{{ m.label.split(" ")[0] }}:</label>
          <input
            type="number"
            min="1"
            max="120"
            v-model.number="customDurations[m.value]"
            @change="onCustomDurationChange(m.value)"
            class="w-12 rounded border border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-900 text-center text-xs"
          />
          <span class="text-xs">นาที</span>
        </div>
      </div>
      <div class="text-6xl font-mono font-extrabold mb-2 select-none">
        {{ mm }}:{{ ss }}
      </div>
      <div class="flex gap-2">
        <button
          @click="toggle"
          class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
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
      <div class="text-xs text-gray-500 mt-2">
        * Pomodoro: ทำงาน 25 นาที พัก 5 นาที (4 รอบพักยาว 15 นาที) <br />
        <span class="text-pink-500">สามารถปรับระยะเวลาเองได้</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

const modes = [
  { value: "work", label: "ทำงาน (นาที)", default: 25 },
  { value: "short", label: "พักสั้น (นาที)", default: 5 },
  { value: "long", label: "พักยาว (นาที)", default: 15 },
];

const customDurations = ref<Record<string, number>>({
  work: 25,
  short: 5,
  long: 15,
});

const mode = ref("work");
const time = ref(customDurations.value[mode.value] * 60);
const running = ref(false);
let timer: number | undefined;

const mm = computed(() => String(Math.floor(time.value / 60)).padStart(2, "0"));
const ss = computed(() => String(time.value % 60).padStart(2, "0"));

function setMode(val: string) {
  mode.value = val;
  time.value = (customDurations.value[val] || 1) * 60;
  running.value = false;
  clearTimer();
}

function onCustomDurationChange(val: string) {
  // ถ้าแก้ไขโหมดปัจจุบัน ให้รีเซ็ตเวลาใหม่
  if (mode.value === val) {
    time.value = (customDurations.value[val] || 1) * 60;
    running.value = false;
    clearTimer();
  }
}

function toggle() {
  running.value = !running.value;
  if (running.value) startTimer();
  else clearTimer();
}

function startTimer() {
  clearTimer();
  timer = window.setInterval(() => {
    if (time.value > 0) time.value--;
    else {
      running.value = false;
      clearTimer();
    }
  }, 1000);
}

function clearTimer() {
  if (timer) clearInterval(timer);
  timer = undefined;
}

function reset() {
  time.value = (customDurations.value[mode.value] || 1) * 60;
  running.value = false;
  clearTimer();
}

onUnmounted(() => {
  clearTimer();
});
</script>
