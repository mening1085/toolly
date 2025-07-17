<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📊 บันทึกเงินออม + กราฟ</h1>
    <p class="mb-4">บันทึกเงินออมรายวัน/เดือน พร้อมกราฟ</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="add" class="w-full flex flex-col gap-2">
        <div class="flex gap-2">
          <input v-model="date" type="date" class="input flex-1" />
          <input
            v-model.number="amount"
            type="number"
            placeholder="จำนวนเงิน"
            class="input flex-1"
          />
          <input v-model="note" placeholder="หมายเหตุ" class="input flex-1" />
        </div>
        <button type="submit" class="btn-primary">เพิ่ม</button>
      </form>
      <table class="w-full mt-4 text-sm">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>จำนวน</th>
            <th>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="i">
            <td>{{ item.date }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
      <div
        class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded mt-4 flex items-center justify-center text-gray-400"
      >
        (mockup กราฟ)
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const date = ref("");
const amount = ref<number | null>(null);
const note = ref("");
const items = ref<{ date: string; amount: number | null; note: string }[]>([]);
function add() {
  if (date.value && amount.value) {
    items.value.push({
      date: date.value,
      amount: amount.value,
      note: note.value,
    });
    date.value = "";
    amount.value = null;
    note.value = "";
  }
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
