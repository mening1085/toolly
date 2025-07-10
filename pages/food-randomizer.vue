<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🎲 สุ่มอาหาร</h1>
    <p class="mb-4">
      ไม่รู้จะกินอะไร? ให้ระบบสุ่มชื่อเมนูให้ เลือกหมวดหมู่ที่อยากกิน
      หรือใส่เมนูเอง แล้วกดสุ่มได้เลย!
    </p>
    <div class="mb-4 flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.value"
        @click="
          selectedCategory = cat.value;
          useCustom = false;
        "
        class="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm font-medium transition hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none text-gray-800 dark:text-gray-100"
        :class="
          selectedCategory === cat.value && !useCustom
            ? 'ring-2 ring-blue-500 dark:ring-blue-300 bg-blue-200 dark:bg-blue-700 text-black dark:text-white font-bold shadow-lg border-blue-600 dark:border-blue-400'
            : ''
        "
      >
        {{ cat.label }}
      </button>
      <button
        @click="useCustom = true"
        class="px-3 py-1 rounded-lg border border-pink-300 dark:border-pink-600 bg-white dark:bg-gray-900 text-sm font-medium transition hover:bg-pink-100 dark:hover:bg-pink-900 focus:outline-none text-pink-700 dark:text-pink-200"
        :class="
          useCustom
            ? 'ring-2 ring-pink-500 dark:ring-pink-300 bg-pink-200 dark:bg-pink-700 text-black dark:text-white font-bold shadow-lg border-pink-600 dark:border-pink-400'
            : ''
        "
      >
        📝 ใช้เมนูของฉันเอง
      </button>
    </div>
    <div v-if="useCustom" class="mb-4">
      <label class="block mb-1 font-medium"
        >กรอกเมนูอาหาร (คั่นแต่ละเมนูด้วย , หรือ Enter)</label
      >
      <textarea
        v-model="customListInput"
        rows="3"
        class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-pink-400"
        placeholder="เช่น ข้าวมันไก่, ข้าวผัด, ส้มตำ"
      ></textarea>
      <div class="text-xs text-gray-500 mt-1">
        จะใช้เฉพาะเมนูที่กรอกนี้ในการสุ่ม
      </div>
    </div>
    <div class="flex flex-col items-center gap-4">
      <button
        @click="randomize"
        class="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 hover:from-pink-500 hover:to-indigo-600 text-white font-bold text-lg shadow transition duration-200 transform hover:scale-105 active:scale-95"
      >
        <span v-if="!isAnimating">สุ่มเมนูอาหาร</span>
        <span v-else class="animate-pulse">กำลังสุ่ม...</span>
      </button>
      <transition name="pop">
        <div v-if="result" class="text-center mt-6">
          <div
            class="text-3xl font-extrabold mb-2 text-indigo-600 dark:text-indigo-300 animate-bounce"
            :key="result"
          >
            <span
              class="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg border border-indigo-200 dark:border-indigo-700"
            >
              {{ result }}
            </span>
          </div>
          <button
            @click="randomize"
            class="mt-2 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            สุ่มใหม่
          </button>
        </div>
      </transition>
      <canvas
        ref="confettiCanvas"
        class="pointer-events-none fixed inset-0 z-50"
        v-show="showConfetti"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

const categories = [
  { value: "all", label: "ทั้งหมด" },
  { value: "thai", label: "อาหารไทย" },
  { value: "japanese", label: "อาหารญี่ปุ่น" },
  { value: "street", label: "สตรีทฟู้ด" },
];

const menus = {
  thai: [
    "ข้าวผัด",
    "ผัดกะเพรา",
    "ต้มยำกุ้ง",
    "แกงเขียวหวาน",
    "ข้าวมันไก่",
    "ส้มตำ",
    "หมูกรอบผัดพริก",
    "ข้าวหมูแดง",
    "ข้าวขาหมู",
    "ข้าวต้มปลา",
  ],
  japanese: [
    "ข้าวหน้าปลาแซลมอน",
    "ราเมง",
    "ซูชิ",
    "ข้าวแกงกะหรี่",
    "ทงคัตสึ",
    "ข้าวหน้าหมูย่าง",
    "เทมปุระ",
    "อุด้ง",
    "ซาชิมิ",
    "โอโคโนมิยากิ",
  ],
  street: [
    "หมูปิ้งข้าวเหนียว",
    "ข้าวไข่เจียว",
    "ก๋วยเตี๋ยวเรือ",
    "ข้าวหมูทอด",
    "ลูกชิ้นปิ้ง",
    "ข้าวเหนียวหมูย่าง",
    "ข้าวโพดปิ้ง",
    "ขนมโตเกียว",
    "ขนมปังปิ้ง",
    "ข้าวคลุกกะปิ",
  ],
};

const selectedCategory = ref("all");
const result = ref("");
const useCustom = ref(false);
const customListInput = ref("");
const isAnimating = ref(false);
const showConfetti = ref(false);
const confettiCanvas = ref<HTMLCanvasElement | null>(null);

function getCustomList() {
  return customListInput.value
    .split(/,|\n/)
    .map((s: string) => s.trim())
    .filter(Boolean);
}

function randomize() {
  let pool: string[] = [];
  if (useCustom.value) {
    pool = getCustomList();
  } else if (selectedCategory.value === "all") {
    pool = [...menus.thai, ...menus.japanese, ...menus.street];
  } else {
    pool = menus[selectedCategory.value as keyof typeof menus];
  }
  if (pool.length === 0) {
    result.value = "ไม่พบเมนูในหมวดนี้";
    return;
  }
  isAnimating.value = true;
  setTimeout(() => {
    const idx = Math.floor(Math.random() * pool.length);
    result.value = pool[idx];
    isAnimating.value = false;
    triggerConfetti();
  }, 700);
}

function triggerConfetti() {
  showConfetti.value = true;
  nextTick(() => {
    if (!confettiCanvas.value) return;
    const canvas = confettiCanvas.value;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiCount = 80;
    const confettiColors = [
      "#6366f1",
      "#f472b6",
      "#60a5fa",
      "#fbbf24",
      "#34d399",
    ];
    const confetti: {
      x: number;
      y: number;
      r: number;
      s: number;
      c: string;
      v: number;
    }[] = [];
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        r: 4 + Math.random() * 4,
        s: 2 + Math.random() * 2,
        c: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        v: 2 + Math.random() * 2,
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const f of confetti) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
        ctx.fillStyle = f.c;
        ctx.fill();
        f.y += f.v;
        f.x += Math.sin(frame / 10 + f.y / 30) * f.s;
        if (f.y > canvas.height) f.y = -10;
      }
      frame++;
      if (showConfetti.value) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
    setTimeout(() => {
      showConfetti.value = false;
    }, 1200);
  });
}
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 2, 0.6, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.pop-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
