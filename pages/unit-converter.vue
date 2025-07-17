<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📏 ตัวแปลงหน่วย</h1>
    <p class="mb-4">ตัวแปลงหน่วย (เช่น เซนติเมตรเป็นนิ้ว)</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="convert" class="flex flex-col gap-3 w-full">
        <div class="flex gap-2 w-full">
          <input
            v-model.number="value"
            type="number"
            class="input flex-1"
            placeholder="กรอกค่า"
            required
          />
          <select v-model="from" class="input">
            <option v-for="u in units" :key="u.value" :value="u.value">
              {{ u.label }}
            </option>
          </select>
          <span class="self-center">→</span>
          <select v-model="to" class="input">
            <option v-for="u in units" :key="u.value" :value="u.value">
              {{ u.label }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-primary">แปลงหน่วย</button>
      </form>
      <div v-if="result !== null" class="mt-4 text-center">
        <div class="text-2xl font-bold">
          {{ value }} {{ getLabel(from) }} = {{ result }} {{ getLabel(to) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const units = [
  { value: "cm", label: "เซนติเมตร" },
  { value: "inch", label: "นิ้ว" },
  { value: "kg", label: "กิโลกรัม" },
  { value: "lb", label: "ปอนด์" },
  { value: "m", label: "เมตร" },
  { value: "ft", label: "ฟุต" },
  { value: "g", label: "กรัม" },
  { value: "oz", label: "ออนซ์" },
];
const value = ref<number | null>(null);
const from = ref("cm");
const to = ref("inch");
const result = ref<number | null>(null);
function getLabel(val: string) {
  return units.find((u) => u.value === val)?.label || val;
}
function convert() {
  if (value.value === null) return;
  let v = value.value;
  if (from.value === to.value) {
    result.value = v;
    return;
  }
  // แปลงหน่วยพื้นฐาน
  const table: Record<string, number> = {
    cm: 1,
    inch: 2.54,
    m: 100,
    ft: 30.48,
    kg: 1,
    lb: 0.45359237,
    g: 0.001,
    oz: 0.0283495,
  };
  // แปลงเป็นหน่วยกลาง (cm หรือ kg)
  let base = v * table[from.value];
  let res = base / table[to.value];
  result.value = +res.toFixed(6);
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
