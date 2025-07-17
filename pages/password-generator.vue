<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🔑 Random password generator</h1>
    <p class="mb-4">สร้างรหัสผ่านสุ่ม</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <div class="flex gap-2 items-center mb-2">
        <label class="text-sm">ความยาว:</label>
        <input
          type="number"
          v-model.number="length"
          min="8"
          max="32"
          class="w-16 rounded border border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-900 text-center"
        />
        <label class="flex items-center gap-1 text-sm"
          ><input type="checkbox" v-model="useUpper" /> ตัวพิมพ์ใหญ่</label
        >
        <label class="flex items-center gap-1 text-sm"
          ><input type="checkbox" v-model="useLower" /> ตัวพิมพ์เล็ก</label
        >
        <label class="flex items-center gap-1 text-sm"
          ><input type="checkbox" v-model="useNumber" /> ตัวเลข</label
        >
        <label class="flex items-center gap-1 text-sm"
          ><input type="checkbox" v-model="useSymbol" /> สัญลักษณ์</label
        >
      </div>
      <button
        @click="generate"
        class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
      >
        สุ่มรหัสผ่าน
      </button>
      <div v-if="password" class="flex flex-col items-center mt-4 w-full">
        <div class="text-2xl font-mono font-bold mb-2 break-all">
          {{ password }}
        </div>
        <button
          @click="copy"
          class="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          คัดลอก
        </button>
        <transition name="fade"
          ><div
            v-if="showCopied"
            class="mt-2 px-4 py-2 rounded bg-green-500 text-white font-bold animate-bounce"
          >
            คัดลอกแล้ว!
          </div></transition
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const length = ref(12);
const useUpper = ref(true);
const useLower = ref(true);
const useNumber = ref(true);
const useSymbol = ref(true);
const password = ref("");
const showCopied = ref(false);
function generate() {
  let chars = "";
  if (useUpper.value) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower.value) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useNumber.value) chars += "0123456789";
  if (useSymbol.value) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?/";
  if (!chars) return;
  let pass = "";
  for (let i = 0; i < length.value; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  password.value = pass;
}
function copy() {
  if (!password.value) return;
  navigator.clipboard.writeText(password.value);
  showCopied.value = true;
  setTimeout(() => (showCopied.value = false), 1200);
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
