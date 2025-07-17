<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📅 นับวันระหว่าง 2 วัน</h1>
    <p class="mb-4">นับวันระหว่าง 2 วัน</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="calcDiff" class="flex flex-col gap-3 w-full">
        <div class="flex gap-2 w-full">
          <label class="flex-1">
            วันที่เริ่มต้น
            <input v-model="start" type="date" class="input w-full" required />
          </label>
          <label class="flex-1">
            วันที่สิ้นสุด
            <input v-model="end" type="date" class="input w-full" required />
          </label>
        </div>
        <button type="submit" class="btn-primary">นับวัน</button>
      </form>
      <div v-if="result !== null" class="mt-4 text-center">
        <div class="text-2xl font-bold">{{ result }} วัน</div>
        <div class="text-xs text-gray-500">* ไม่นับวันสิ้นสุด</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const start = ref("");
const end = ref("");
const result = ref<number | null>(null);
function calcDiff() {
  if (!start.value || !end.value) return;
  const d1 = new Date(start.value);
  const d2 = new Date(end.value);
  const diff = Math.floor(
    (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
  );
  result.value = diff;
}
</script>
<style scoped>
.input {
  @apply rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition;
}
.btn-primary {
  @apply px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition;
}
</style>
