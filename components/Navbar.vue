<template>
  <nav
    class="w-full bg-gradient-to-r from-indigo-200 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow flex items-center justify-center px-4 py-4 relative"
  >
    <NuxtLink
      to="/"
      class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-400 bg-clip-text text-transparent drop-shadow"
    >
      toolly
    </NuxtLink>
    <span class="absolute right-16 top-1/2 -translate-y-1/2">
      <button
        @click="toggleDark"
        class="rounded-full p-2 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
        title="Toggle dark mode"
      >
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>
    </span>
    <span
      class="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-blue-100 text-blue-600 rounded px-2 py-0.5 select-none pointer-events-none"
      >beta</span
    >
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isDark = ref(false);

function toggleDark() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("toolly-dark", "1");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("toolly-dark", "0");
  }
}
onMounted(() => {
  isDark.value =
    localStorage.getItem("toolly-dark") === "1" ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("toolly-dark"));
  if (isDark.value) document.documentElement.classList.add("dark");
});
</script>
