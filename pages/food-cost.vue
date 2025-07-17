<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">💰 คำนวณต้นทุนอาหาร/สูตร</h1>
    <p class="mb-4">คำนวณต้นทุนต่อจานและกำไร</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="calc" class="w-full flex flex-col gap-2">
        <div v-for="(item, i) in items" :key="i" class="flex gap-2">
          <input
            v-model="item.name"
            placeholder="วัตถุดิบ"
            class="input flex-1"
          />
          <input
            v-model.number="item.price"
            type="number"
            placeholder="ราคา"
            class="input w-20"
          />
          <input
            v-model.number="item.amount"
            type="number"
            placeholder="ปริมาณ"
            class="input w-20"
          />
          <button type="button" @click="remove(i)" class="text-red-500">
            ลบ
          </button>
        </div>
        <button type="button" @click="add" class="text-blue-500">
          + เพิ่มวัตถุดิบ
        </button>
        <button type="submit" class="btn-primary mt-2">คำนวณ</button>
      </form>
      <div v-if="result !== null" class="mt-4 text-center">
        <div class="text-2xl font-bold">
          ต้นทุนต่อจาน: {{ result }} บาท (mockup)
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const items = ref([{ name: "", price: 0, amount: 1 }]);
const result = ref<number | null>(null);
function add() {
  items.value.push({ name: "", price: 0, amount: 1 });
}
function remove(i: number) {
  items.value.splice(i, 1);
}
function calc() {
  result.value = items.value.reduce((sum, it) => sum + (it.price || 0), 0);
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
