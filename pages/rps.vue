<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">✌️ เป่ายิ้งฉุบออนไลน์</h1>
    <p class="mb-4">ใช้ตัดสินใจกับเพื่อน ๆ ได้</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center"
    >
      <div class="mb-4 w-full">
        <label class="block font-medium mb-2 text-center"
          >เลือกตัวเลือกของคุณ</label
        >
        <div class="flex justify-center gap-4">
          <button
            v-for="opt in options"
            :key="opt.value"
            @click="select(opt.value)"
            :class="[
              'px-6 py-3 rounded-xl text-2xl font-bold shadow transition',
              selected === opt.value
                ? 'bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
            ]"
          >
            <span>{{ opt.emoji }}</span>
            <span class="ml-2 text-lg">{{ opt.label }}</span>
          </button>
        </div>
      </div>
      <button
        @click="play"
        class="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
        :disabled="!selected"
      >
        เป่ายิ้งฉุบ!
      </button>
      <transition name="pop">
        <div v-if="result" class="text-center mt-6 w-full">
          <div class="mb-2 text-lg">
            คุณเลือก: <span class="font-bold">{{ getLabel(selected) }}</span>
          </div>
          <div class="mb-2 text-lg">
            ฝ่ายตรงข้าม: <span class="font-bold">{{ getLabel(opponent) }}</span>
          </div>
          <div
            class="text-3xl font-extrabold mb-2"
            :class="{
              'text-green-600 dark:text-green-400': result === 'ชนะ',
              'text-red-600 dark:text-red-400': result === 'แพ้',
              'text-gray-600 dark:text-gray-300': result === 'เสมอ',
            }"
          >
            {{ result }}
          </div>
          <button
            @click="play"
            class="mt-2 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            เล่นใหม่
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const options = [
  { value: "rock", label: "ค้อน", emoji: "✊" },
  { value: "scissors", label: "กรรไกร", emoji: "✌️" },
  { value: "paper", label: "กระดาษ", emoji: "🖐️" },
];

const selected = ref<string>("");
const opponent = ref<string>("");
const result = ref<string>("");

function select(val: string) {
  selected.value = val;
  result.value = "";
}

function play() {
  if (!selected.value) return;
  const opp = options[Math.floor(Math.random() * options.length)].value;
  opponent.value = opp;
  result.value = judge(selected.value, opp);
}

function judge(user: string, opp: string): string {
  if (user === opp) return "เสมอ";
  if (
    (user === "rock" && opp === "scissors") ||
    (user === "scissors" && opp === "paper") ||
    (user === "paper" && opp === "rock")
  ) {
    return "ชนะ";
  }
  return "แพ้";
}

function getLabel(val: string) {
  const found = options.find((o) => o.value === val);
  return found ? `${found.emoji} ${found.label}` : "-";
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
