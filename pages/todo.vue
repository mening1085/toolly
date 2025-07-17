<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📝 To-do list รายวัน</h1>
    <p class="mb-4">To-do list รายวันแบบ minimal</p>
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4 flex flex-col items-center gap-4"
    >
      <form @submit.prevent="addTask" class="flex w-full gap-2 mb-4">
        <input
          v-model="newTask"
          type="text"
          class="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
          placeholder="เพิ่มงานใหม่..."
          required
        />
        <button
          type="submit"
          class="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
        >
          เพิ่ม
        </button>
      </form>
      <ul class="w-full">
        <li
          v-for="(t, i) in tasks"
          :key="t.id"
          class="flex items-center gap-2 mb-2"
        >
          <input
            type="checkbox"
            v-model="t.done"
            class="w-5 h-5 rounded border-gray-300 dark:border-gray-700"
          />
          <span
            :class="{ 'line-through text-gray-400': t.done }"
            class="flex-1"
            >{{ t.text }}</span
          >
          <button
            @click="removeTask(t.id)"
            class="text-red-500 hover:text-red-700 text-lg px-2 py-1 rounded-full transition"
          >
            ×
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
interface Task {
  id: string;
  text: string;
  done: boolean;
}
const tasks = ref<Task[]>([]);
const newTask = ref("");
function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    id: Date.now().toString() + Math.random().toString(36),
    text: newTask.value.trim(),
    done: false,
  });
  newTask.value = "";
}
function removeTask(id: string) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}
</script>
