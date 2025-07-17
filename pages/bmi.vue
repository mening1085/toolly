<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">⚖️ คำนวณ BMI / น้ำหนักในอุดมคติ</h1>
    <p class="mb-4">เครื่องคำนวณ BMI / น้ำหนักในอุดมคติ – ใช้งานง่าย</p>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
      <form @submit.prevent="calcBMI" class="flex flex-col gap-3 mb-4">
        <div class="flex gap-2">
          <label class="flex-1">
            ส่วนสูง (ซม.)
            <input
              v-model.number="height"
              type="number"
              min="50"
              max="250"
              class="input w-full"
              required
            />
          </label>
          <label class="flex-1">
            น้ำหนัก (กก.)
            <input
              v-model.number="weight"
              type="number"
              min="10"
              max="250"
              class="input w-full"
              required
            />
          </label>
        </div>
        <button type="submit" class="btn-primary mt-2">คำนวณ</button>
      </form>
      <div v-if="bmi" class="mt-4 text-center">
        <div class="text-3xl font-bold mb-2">BMI: {{ bmi.toFixed(2) }}</div>
        <div class="mb-2 font-medium" :class="bmiClass">{{ bmiCategory }}</div>
        <div class="text-sm text-gray-500 mb-2">
          น้ำหนักในอุดมคติ: {{ idealWeightMin }} - {{ idealWeightMax }} กก.
        </div>
        <div class="text-xs text-gray-400">
          * ข้อมูลนี้เป็นเพียงแนวทางเบื้องต้น
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const bmi = ref<number | null>(null);
const bmiCategory = ref("");
const bmiClass = computed(() => {
  if (!bmi.value) return "";
  if (bmi.value < 18.5) return "text-blue-500";
  if (bmi.value < 23) return "text-green-600";
  if (bmi.value < 25) return "text-yellow-500";
  if (bmi.value < 30) return "text-orange-500";
  return "text-red-600";
});
const idealWeightMin = computed(() =>
  height.value ? ((height.value / 100) ** 2 * 18.5).toFixed(1) : "-"
);
const idealWeightMax = computed(() =>
  height.value ? ((height.value / 100) ** 2 * 22.9).toFixed(1) : "-"
);
function calcBMI() {
  if (!height.value || !weight.value) return;
  bmi.value = weight.value / (height.value / 100) ** 2;
  if (bmi.value < 18.5) bmiCategory.value = "น้ำหนักน้อย/ผอม";
  else if (bmi.value < 23) bmiCategory.value = "ปกติ (สุขภาพดี)";
  else if (bmi.value < 25) bmiCategory.value = "น้ำหนักเกิน";
  else if (bmi.value < 30) bmiCategory.value = "อ้วนระดับ 1";
  else bmiCategory.value = "อ้วนระดับ 2";
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
