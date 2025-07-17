<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🎨 สุ่มสี / โทนสี</h1>
    <p class="mb-4">
      เครื่องช่วยสุ่มสี / โทนสี – ใช้เลือกธีมหรือไอเดียสำหรับออกแบบ
    </p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <div class="flex gap-2 w-full justify-center items-center">
        <button
          @click="randomColor"
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-indigo-600 transition"
        >
          สุ่มสีเดียว
        </button>
        <button
          @click="randomPalette"
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold shadow hover:from-green-500 hover:to-blue-600 transition"
        >
          สุ่มโทนสี
        </button>
        <label class="ml-2 flex items-center gap-1 text-sm">
          จำนวนสี:
          <input
            type="number"
            v-model.number="paletteCount"
            min="2"
            max="10"
            class="w-14 rounded border border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-900 text-center"
          />
        </label>
      </div>
      <div v-if="color" class="flex flex-col items-center mt-4 w-full">
        <div
          class="w-32 h-16 rounded-lg shadow mb-2 border border-gray-200 dark:border-gray-700"
          :style="{ background: color }"
        ></div>
        <div class="flex items-center gap-2">
          <span class="font-mono text-lg">{{ color }}</span>
          <button
            @click="copy(color)"
            class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs"
          >
            คัดลอก
          </button>
        </div>
      </div>
      <div v-if="palette.length" class="flex flex-col items-center mt-4 w-full">
        <div class="flex gap-2 mb-2">
          <div
            v-for="(c, i) in palette"
            :key="i"
            class="w-16 h-16 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            :style="{ background: c }"
          ></div>
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <div
            v-for="(c, i) in palette"
            :key="'hex-' + i"
            class="flex items-center gap-1"
          >
            <span class="font-mono text-sm">{{ c }}</span>
            <button
              @click="copy(c)"
              class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs"
            >
              คัดลอก
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showCopied"
        class="fixed left-1/2 top-8 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-green-500 text-white font-bold shadow-lg text-center text-lg animate-bounce"
      >
        คัดลอกสี {{ copiedText }} แล้ว!
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref<string>("");
const palette = ref<string[]>([]);
const paletteCount = ref<number>(5);
const showCopied = ref(false);
const copiedText = ref("");
let copiedTimeout: number | undefined;

function randomHex(): string {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  ).toUpperCase();
}

function randomColor() {
  color.value = randomHex();
  palette.value = [];
}

function randomPalette() {
  const count = Math.max(2, Math.min(10, paletteCount.value || 5));
  palette.value = Array.from({ length: count }, randomHex);
  color.value = "";
}

function copy(val: string) {
  navigator.clipboard.writeText(val);
  copiedText.value = val;
  showCopied.value = true;
  if (copiedTimeout) clearTimeout(copiedTimeout);
  copiedTimeout = window.setTimeout(() => {
    showCopied.value = false;
  }, 1200);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
