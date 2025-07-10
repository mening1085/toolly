<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📒 บันทึกรายรับรายจ่าย</h1>
    <p class="mb-4">ใช้งานไว ไม่ต้องล็อกอิน</p>
    <form @submit.prevent="addItem" class="flex flex-col gap-2 mb-6">
      <div class="flex gap-2">
        <input
          v-model="form.date"
          type="date"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition w-32"
          required
        />
        <select
          v-model="form.type"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition w-28"
        >
          <option value="income">รายรับ</option>
          <option value="expense">รายจ่าย</option>
        </select>
        <select
          v-model="form.category"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition w-32"
        >
          <option value="ทั่วไป">ทั่วไป</option>
          <option value="อาหาร">อาหาร</option>
          <option value="เดินทาง">เดินทาง</option>
          <option value="บันเทิง">บันเทิง</option>
          <option value="สุขภาพ">สุขภาพ</option>
          <option value="ของใช้">ของใช้</option>
          <option value="เงินเดือน">เงินเดือน</option>
          <option value="อื่น ๆ">อื่น ๆ</option>
        </select>
      </div>
      <div class="flex gap-2">
        <input
          v-model="form.note"
          type="text"
          class="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
          placeholder="รายละเอียด"
        />
        <input
          v-model.number="form.amount"
          type="number"
          min="0.01"
          step="0.01"
          class="w-32 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition text-right"
          placeholder="จำนวนเงิน"
          required
        />
        <button
          type="submit"
          class="px-4 py-2 rounded-xl bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
        >
          เพิ่ม
        </button>
      </div>
    </form>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
      <client-only>
        <div class="flex justify-between mb-2">
          <div>
            รายรับ:
            <span class="text-green-600 font-bold">{{
              incomeTotal.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            }}</span>
            บาท
          </div>
          <div>
            รายจ่าย:
            <span class="text-red-500 font-bold">{{
              expenseTotal.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            }}</span>
            บาท
          </div>
          <div>
            คงเหลือ:
            <span
              :class="balance >= 0 ? 'text-blue-600' : 'text-red-600'"
              class="font-bold"
              >{{
                balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
              }}</span
            >
            บาท
          </div>
        </div>
        <div v-if="itemsSorted.length" class="overflow-x-auto">
          <table class="min-w-full text-xs border rounded">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th class="p-1">วันที่</th>
                <th class="p-1">ประเภท</th>
                <th class="p-1">หมวดหมู่</th>
                <th class="p-1">รายละเอียด</th>
                <th class="p-1 text-right">จำนวนเงิน</th>
                <th class="p-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in itemsSorted"
                :key="item.id"
                class="border-b border-gray-100 dark:border-gray-800"
              >
                <td>{{ item.date }}</td>
                <td>
                  <span
                    :class="
                      item.type === 'income' ? 'text-green-600' : 'text-red-500'
                    "
                  >
                    {{ item.type === "income" ? "รับ" : "จ่าย" }}
                  </span>
                </td>
                <td>{{ item.category }}</td>
                <td>{{ item.note }}</td>
                <td
                  class="text-right font-bold"
                  :class="
                    item.type === 'income' ? 'text-green-600' : 'text-red-500'
                  "
                >
                  {{
                    item.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }}
                </td>
                <td>
                  <button
                    @click="removeItem(item.id)"
                    class="text-red-400 hover:text-red-700 text-lg px-2 py-1 rounded-full transition"
                    aria-label="ลบ"
                  >
                    ×
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center text-gray-400 dark:text-gray-500 py-8">
          ยังไม่มีข้อมูล
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useExpenseStore } from "~/stores/expenseStore";

const store = useExpenseStore();
const form = ref({
  date: new Date().toISOString().slice(0, 10),
  type: "expense",
  category: "ทั่วไป",
  note: "",
  amount: null as number | null,
});

function addItem() {
  if (!form.value.amount || !form.value.date) return;
  store.addItem({
    date: form.value.date,
    type: form.value.type as "income" | "expense",
    category: form.value.category,
    note: form.value.note,
    amount: form.value.amount,
  });
  form.value.note = "";
  form.value.amount = null;
}
function removeItem(id: string) {
  store.removeItem(id);
}
const itemsSorted = computed(() =>
  [...store.items].sort((a, b) => b.date.localeCompare(a.date))
);
const incomeTotal = computed(() => store.incomeTotal);
const expenseTotal = computed(() => store.expenseTotal);
const balance = computed(() => store.balance);
</script>
