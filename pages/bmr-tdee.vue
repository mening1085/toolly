<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">
      🔥 คำนวณแคลอรี่ที่ควรได้รับ (BMR/TDEE)
    </h1>
    <p class="mb-4">คำนวณพลังงานที่ควรได้รับต่อวัน</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="calc" class="w-full flex flex-col gap-2">
        <div class="flex gap-2">
          <select v-model="gender" class="input flex-1">
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
          <input
            v-model.number="age"
            type="number"
            placeholder="อายุ"
            class="input flex-1"
          />
          <input
            v-model.number="weight"
            type="number"
            placeholder="น้ำหนัก (กก.)"
            class="input flex-1"
          />
          <input
            v-model.number="height"
            type="number"
            placeholder="ส่วนสูง (ซม.)"
            class="input flex-1"
          />
        </div>
        <select v-model="activity" class="input w-full">
          <option value="1.2">ไม่ออกกำลังกาย</option>
          <option value="1.375">ออกกำลังกายเบา ๆ (1-3 วัน/สัปดาห์)</option>
          <option value="1.55">ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)</option>
          <option value="1.725">ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)</option>
          <option value="1.9">ออกกำลังกายหนักมาก/ใช้แรงงาน</option>
        </select>
        <button type="submit" class="btn-primary">คำนวณ</button>
      </form>
      <div v-if="bmr && tdee" class="mt-4 text-center">
        <div class="text-2xl font-bold">BMR: {{ bmr }} kcal</div>
        <div class="text-2xl font-bold">TDEE: {{ tdee }} kcal</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const gender = ref("male");
const age = ref<number | null>(null);
const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const activity = ref("1.2");
const bmr = ref<number | null>(null);
const tdee = ref<number | null>(null);
function calc() {
  if (!age.value || !weight.value || !height.value) return;
  bmr.value =
    gender.value === "male"
      ? 66 + 13.7 * weight.value + 5 * height.value - 6.8 * age.value
      : 655 + 9.6 * weight.value + 1.8 * height.value - 4.7 * age.value;
  tdee.value = Math.round(bmr.value * parseFloat(activity.value));
}
</script>
<style scoped>
.input {
  @apply rounded border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm;
}
.btn-primary {
  @apply px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition;
}
</style>
