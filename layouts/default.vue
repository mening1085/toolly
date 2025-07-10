<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <Navbar />
    <main class="flex-1 container mx-auto px-4 py-6">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// Layout หลัก เรียก Navbar/Footer จาก components
</script>
