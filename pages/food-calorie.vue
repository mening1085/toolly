<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🔥 เครื่องคิดแคลอรี่เบื้องต้น</h1>
    <p class="mb-4">กรอกเมนูแล้วดูว่าได้กี่แคลอรี่โดยประมาณ</p>
    <form @submit.prevent="addFood" class="flex flex-col gap-2 mb-4">
      <div class="flex gap-2 items-center">
        <div class="flex-1 relative">
          <input
            v-model="foodName"
            @input="onFoodInput"
            list="food-list"
            type="text"
            class="w-full rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-pink-400 transition placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="ชื่อเมนู เช่น ข้าวผัด หรือ Fried Rice"
            autocomplete="off"
          />
          <datalist id="food-list">
            <option
              v-for="item in filteredFoods"
              :key="item.name"
              :value="item.name"
            >
              {{ item.name }}{{ item.en ? " (" + item.en + ")" : "" }}
            </option>
          </datalist>
        </div>
        <input
          v-model.number="foodAmount"
          type="number"
          min="1"
          class="w-20 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition text-center"
          placeholder="จำนวน"
        />
        <select
          v-model="foodUnit"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="จาน">จาน</option>
          <option value="ชิ้น">ชิ้น</option>
          <option value="ถ้วย">ถ้วย</option>
          <option value="แก้ว">แก้ว</option>
          <option value="กล่อง">กล่อง</option>
          <option value="อื่น ๆ">อื่น ๆ</option>
        </select>
        <button
          type="submit"
          class="ml-2 px-3 py-2 rounded-xl bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
        >
          เพิ่ม
        </button>
        <button
          type="button"
          @click="showAddModal = true"
          class="ml-1 px-3 py-2 rounded-xl bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-bold shadow hover:bg-blue-200 dark:hover:bg-blue-700 transition"
        >
          + เมนูใหม่
        </button>
      </div>
    </form>
    <!-- Modal เพิ่มเมนูใหม่ -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md relative"
      >
        <button
          @click="showAddModal = false"
          class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
        >
          ×
        </button>
        <h2 class="font-bold text-lg mb-3">เพิ่มเมนูอาหารใหม่</h2>
        <form @submit.prevent="addCustomFood" class="flex flex-col gap-3">
          <input
            v-model="newFood.name"
            type="text"
            class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm"
            placeholder="ชื่อเมนู (ไทย)"
            required
          />
          <input
            v-model="newFood.en"
            type="text"
            class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm"
            placeholder="ชื่อเมนู (อังกฤษ)"
          />
          <input
            v-model.number="newFood.calorie"
            type="number"
            min="1"
            class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm"
            placeholder="แคลอรี่/หน่วย"
            required
          />
          <select
            v-model="newFood.category"
            class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm"
          >
            <option value="อาหารจานเดียว">อาหารจานเดียว</option>
            <option value="กับข้าว">กับข้าว</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
            <option value="ขนม">ขนม</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
          <input
            v-model="newFood.img"
            type="url"
            class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm"
            placeholder="URL รูปภาพ (ถ้ามี)"
          />
          <button
            type="submit"
            class="mt-2 px-4 py-2 rounded-xl bg-pink-500 text-white font-bold shadow hover:bg-pink-600 transition"
          >
            บันทึกเมนู
          </button>
        </form>
      </div>
    </div>
    <div
      v-if="foods.length"
      class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4"
    >
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="py-1 text-left">เมนู</th>
            <th class="py-1 text-center">จำนวน</th>
            <th class="py-1 text-center">หน่วย</th>
            <th class="py-1 text-center">แคลอรี่/หน่วย</th>
            <th class="py-1 text-center">รวม</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(f, i) in foods"
            :key="i"
            class="border-b border-gray-100 dark:border-gray-800"
          >
            <td>{{ f.name }}</td>
            <td class="text-center">{{ f.amount }}</td>
            <td class="text-center">{{ f.unit }}</td>
            <td class="text-center">{{ f.caloriePerUnit }}</td>
            <td class="text-center font-bold">
              {{ (f.caloriePerUnit * f.amount).toLocaleString() }}
            </td>
            <td>
              <button
                @click="removeFood(i)"
                class="text-red-500 hover:text-red-700 text-lg px-2 py-1 rounded-full transition"
                aria-label="ลบ"
              >
                ×
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right mt-2 font-bold text-lg">
        รวมทั้งหมด:
        <span class="text-pink-500">{{ totalCalorie.toLocaleString() }}</span>
        kcal
      </div>
    </div>
    <div v-else class="text-center text-gray-400 dark:text-gray-500 mt-8">
      เพิ่มเมนูอาหารเพื่อคำนวณแคลอรี่
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type FoodDbItem = {
  name: string;
  en?: string;
  calorie: number;
  category?: string;
  img?: string;
};
const foodDb = ref<FoodDbItem[]>([
  {
    name: "ข้าวผัด",
    en: "Fried Rice",
    calorie: 600,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ข้าวมันไก่",
    en: "Hainanese Chicken Rice",
    calorie: 600,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ข้าวกะเพรา",
    en: "Basil Stir-fry Rice",
    calorie: 550,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ข้าวไข่เจียว",
    en: "Omelette Rice",
    calorie: 400,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ข้าวต้ม",
    en: "Rice Porridge",
    calorie: 250,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ส้มตำ",
    en: "Papaya Salad",
    calorie: 80,
    category: "กับข้าว",
    img: "",
  },
  {
    name: "ผัดไทย",
    en: "Pad Thai",
    calorie: 550,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "ก๋วยเตี๋ยวเรือ",
    en: "Boat Noodles",
    calorie: 350,
    category: "อาหารจานเดียว",
    img: "",
  },
  { name: "ขนมปังปิ้ง", en: "Toast", calorie: 120, category: "ขนม", img: "" },
  {
    name: "ชาไทย",
    en: "Thai Tea",
    calorie: 160,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "กาแฟเย็น",
    en: "Iced Coffee",
    calorie: 120,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "น้ำอัดลม",
    en: "Soft Drink",
    calorie: 140,
    category: "เครื่องดื่ม",
    img: "",
  },
  {
    name: "พิซซ่า",
    en: "Pizza",
    calorie: 300,
    category: "อาหารจานเดียว",
    img: "",
  },
  {
    name: "เฟรนช์ฟรายส์",
    en: "French Fries",
    calorie: 320,
    category: "ขนม",
    img: "",
  },
  {
    name: "ไก่ทอด",
    en: "Fried Chicken",
    calorie: 250,
    category: "กับข้าว",
    img: "",
  },
  { name: "อื่น ๆ", en: "", calorie: 100, category: "อื่น ๆ", img: "" },
]);

const foodName = ref("");
const foodAmount = ref(1);
const foodUnit = ref("จาน");
const foods = ref<
  {
    name: string;
    amount: number;
    unit: string;
    caloriePerUnit: number;
    category?: string;
    img?: string;
  }[]
>([]);
const showAddModal = ref(false);
const newFood = ref<FoodDbItem>({
  name: "",
  en: "",
  calorie: 100,
  category: "อาหารจานเดียว",
  img: "",
});

const filteredFoods = computed(() => {
  if (!foodName.value) return foodDb.value;
  return foodDb.value.filter(
    (f) =>
      f.name.includes(foodName.value) ||
      (f.en && f.en.toLowerCase().includes(foodName.value.toLowerCase()))
  );
});

function onFoodInput() {
  // auto fill calorie ถ้าเลือกจาก list
  const found = foodDb.value.find((f) => f.name === foodName.value);
  if (found) foodUnit.value = "จาน";
}

function addFood() {
  if (!foodName.value || foodAmount.value < 1) return;
  const found = foodDb.value.find((f) => f.name === foodName.value);
  const caloriePerUnit = found ? found.calorie : 100;
  foods.value.push({
    name: foodName.value,
    amount: foodAmount.value,
    unit: foodUnit.value,
    caloriePerUnit,
    category: found?.category,
    img: found?.img,
  });
  foodName.value = "";
  foodAmount.value = 1;
  foodUnit.value = "จาน";
}

function removeFood(i: number) {
  foods.value.splice(i, 1);
}

function addCustomFood() {
  if (!newFood.value.name || !newFood.value.calorie) return;
  foodDb.value.push({
    name: newFood.value.name,
    en: newFood.value.en,
    calorie: newFood.value.calorie,
    category: newFood.value.category,
    img: newFood.value.img,
  });
  showAddModal.value = false;
  newFood.value = {
    name: "",
    en: "",
    calorie: 100,
    category: "อาหารจานเดียว",
    img: "",
  };
}

const totalCalorie = computed(() =>
  foods.value.reduce((sum, f) => sum + f.caloriePerUnit * f.amount, 0)
);
</script>
