<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🎯 วางแผนเงินเก็บตามเป้าหมาย</h1>
    <p class="mb-4">อยากเก็บ 50,000 ใน 6 เดือน ต้องเก็บเดือนละเท่าไร?</p>
    <form
      @submit.prevent="calcPlan"
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-3 mb-6"
    >
      <div class="flex flex-col gap-1">
        <label class="font-medium">เป้าหมายเงินเก็บ (บาท)</label>
        <input
          v-model.number="goal"
          type="number"
          min="1"
          class="input"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-medium">ระยะเวลา (เดือน)</label>
        <input
          v-model.number="months"
          type="number"
          min="1"
          class="input"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-medium">วันที่เริ่มต้น</label>
        <input v-model="startDate" type="date" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-medium">เงินที่มีอยู่แล้ว (บาท)</label>
        <input v-model.number="current" type="number" min="0" class="input" />
      </div>
      <div class="flex gap-2 mt-2">
        <button type="submit" class="btn-primary flex-1">คำนวณ</button>
        <button type="button" class="btn-secondary" @click="reset">ล้าง</button>
      </div>
    </form>
    <div
      v-if="result"
      class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-4"
    >
      <div class="mb-2">
        <span
          >ต้องเก็บเงิน
          <span class="font-bold text-blue-600 dark:text-blue-300">{{
            result.perMonth.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}</span>
          บาท/เดือน</span
        >
      </div>
      <div v-if="result.perWeek">
        <span
          >หรือ
          <span class="font-bold text-blue-600 dark:text-blue-300">{{
            result.perWeek.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}</span>
          บาท/สัปดาห์</span
        >
      </div>
      <div class="mt-2 text-xs text-gray-500">
        * คำนวณแบบหารเท่า ๆ กันทุกเดือน
      </div>
    </div>
    <div v-if="result && plan.length" class="overflow-x-auto">
      <table class="min-w-full text-xs border rounded">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="p-1">งวดที่</th>
            <th class="p-1">เดือน</th>
            <th class="p-1 text-right">ยอดสะสม (บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in plan"
            :key="i"
            class="border-b border-gray-100 dark:border-gray-800"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ row.month }}</td>
            <td class="text-right font-bold">
              {{
                row.total.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const goal = ref<number>(50000);
const months = ref<number>(6);
const startDate = ref<string>(new Date().toISOString().slice(0, 10));
const current = ref<number>(0);
const result = ref<{ perMonth: number; perWeek: number } | null>(null);
const plan = ref<{ month: string; total: number }[]>([]);

function calcPlan() {
  const remain = Math.max(goal.value - current.value, 0);
  const perMonth = remain / months.value;
  const perWeek = remain / (months.value * 4.345);
  result.value = {
    perMonth,
    perWeek,
  };
  // สร้างตารางแผน
  const arr = [];
  let sum = current.value;
  let date = startDate.value ? new Date(startDate.value) : new Date();
  for (let i = 0; i < months.value; i++) {
    sum += perMonth;
    const m = date.toLocaleString("th-TH", { year: "numeric", month: "short" });
    arr.push({ month: m, total: sum });
    date.setMonth(date.getMonth() + 1);
  }
  plan.value = arr;
}
function reset() {
  goal.value = 50000;
  months.value = 6;
  startDate.value = new Date().toISOString().slice(0, 10);
  current.value = 0;
  result.value = null;
  plan.value = [];
}
</script>

<style scoped>
.input {
  @apply rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition;
}
.btn-primary {
  @apply px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition;
}
.btn-secondary {
  @apply px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition;
}
</style>
