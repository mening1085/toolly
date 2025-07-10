<template>
  <NuxtLink :to="to" class="block group h-full">
    <div
      class="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50/80 via-white/90 to-indigo-100/80 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 h-full transition-transform transform group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-2xl duration-200"
    >
      <div
        class="absolute right-4 top-4 z-10 opacity-20 text-7xl pointer-events-none select-none"
      >
        {{ icon }}
      </div>
      <div class="relative z-20 p-6 flex flex-col h-full">
        <div class="flex items-center gap-3 mb-2">
          <span
            class="text-3xl drop-shadow font-extrabold bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-400 bg-clip-text text-transparent"
          >
            {{ icon }}
          </span>
          <span class="font-bold text-lg text-gray-900 dark:text-white">
            {{ title }}
          </span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300 flex-1">
          {{ description }}
        </div>
        <div
          class="mt-4 flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-semibold group-hover:underline"
        >
          <span>เริ่มเลย</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
      <div
        class="absolute inset-0 pointer-events-none group-hover:bg-indigo-100/30 dark:group-hover:bg-indigo-900/20 transition duration-200"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; description: string; to: string }>();
</script>
