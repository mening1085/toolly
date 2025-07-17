<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">🎁 คำนวณหารเงินของขวัญ/ของใช้</h1>
    <p class="mb-4">แบ่งเงินซื้อของขวัญหรือของใช้ร่วมกันแบบง่าย ๆ</p>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
      <form @submit.prevent="calculate" class="flex flex-col gap-4">
        <div>
          <label class="block font-medium mb-1"
            >รายชื่อและจำนวนเงินที่แต่ละคนจะจ่าย</label
          >
          <div class="flex flex-col gap-2">
            <div
              v-for="(person, i) in people"
              :key="i"
              class="flex gap-2 items-center"
            >
              <span
                class="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-500 mr-1"
                >{{ i + 1 }}</span
              >
              <input
                v-model="person.name"
                type="text"
                class="w-1/3 rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="ชื่อ เช่น A"
              />
              <div class="relative w-1/2">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm"
                  >฿</span
                >
                <input
                  v-model.number="person.amount"
                  type="number"
                  min="0"
                  step="0.01"
                  class="pl-7 pr-2 py-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-pink-400 transition placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="จำนวนเงินที่จ่าย"
                />
              </div>
              <button
                @click="removePerson(i)"
                type="button"
                class="ml-1 text-red-500 hover:text-red-700 text-lg px-2 py-1 rounded-full transition"
                v-if="people.length > 2"
                aria-label="ลบคนนี้"
              >
                ×
              </button>
            </div>
            <button
              @click="addPerson"
              type="button"
              class="mt-2 px-3 py-1 rounded-xl bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition flex items-center gap-1"
            >
              <span class="text-lg">＋</span> เพิ่มคน
            </button>
          </div>
        </div>
        <div class="flex gap-2 mt-2">
          <button
            type="submit"
            class="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-indigo-600 transition"
          >
            คำนวณ
          </button>
          <button
            @click="resetAll"
            type="button"
            class="flex-1 px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            รีเซ็ต
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="result.length"
      class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 mt-4"
    >
      <h2 class="font-bold mb-2">สรุปยอดที่แต่ละคนต้องจ่าย</h2>
      <ul>
        <li
          v-for="(r, i) in result"
          :key="i"
          class="flex justify-between border-b border-dashed border-gray-300 dark:border-gray-700 py-1"
        >
          <span>{{ r.name }}</span>
          <span
            :class="
              r.diff > 0
                ? 'text-green-600 dark:text-green-400'
                : r.diff < 0
                ? 'text-red-600 dark:text-red-400'
                : ''
            "
          >
            <template v-if="r.diff > 0"
              >รับคืน
              {{
                r.diff.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              ฿</template
            >
            <template v-else-if="r.diff < 0"
              >จ่ายเพิ่ม
              {{
                Math.abs(r.diff).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              ฿</template
            >
            <template v-else>พอดีเป๊ะ</template>
          </span>
        </li>
      </ul>
      <div class="text-xs text-gray-500 mt-2">
        * ทุกคนควรจ่ายเท่ากัน:
        {{
          avg.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }}
        ฿
      </div>
      <div class="text-xs text-gray-500">
        ยอดรวม:
        {{
          sum.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }}
        ฿
      </div>
      <div v-if="flows.length" class="mt-4">
        <h3 class="font-bold mb-1">รายละเอียดการโอน</h3>
        <ul>
          <li
            v-for="(f, i) in flows"
            :key="i"
            class="flex justify-between py-1"
          >
            <span
              >{{ f.from }} <span class="text-gray-400">→</span>
              {{ f.to }}</span
            >
            <span class="font-bold"
              >{{
                f.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              ฿</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Person = { name: string; amount: number | null };
const people = ref<Person[]>([
  { name: "A", amount: null },
  { name: "B", amount: null },
]);
const result = ref<{ name: string; diff: number }[]>([]);
const sum = ref(0);
const avg = ref(0);
const flows = ref<{ from: string; to: string; amount: number }[]>([]);

function addPerson() {
  people.value.push({ name: "", amount: null });
}
function removePerson(i: number) {
  if (people.value.length > 2) people.value.splice(i, 1);
}
function resetAll() {
  people.value = [
    { name: "A", amount: null },
    { name: "B", amount: null },
  ];
  result.value = [];
  sum.value = 0;
  avg.value = 0;
  flows.value = [];
}
function calculate() {
  const valid = people.value.filter(
    (p: Person) => typeof p.amount === "number" && p.amount !== null
  );
  if (valid.length !== people.value.length) {
    result.value = [];
    sum.value = 0;
    avg.value = 0;
    flows.value = [];
    return;
  }
  sum.value = people.value.reduce(
    (s: number, p: Person) => s + (p.amount || 0),
    0
  );
  avg.value = sum.value / people.value.length;
  result.value = people.value.map((p: Person, i: number) => ({
    name: p.name || `คนที่ ${i + 1}`,
    diff: Math.round(((p.amount || 0) - avg.value) * 100) / 100,
  }));

  // คำนวณ flow การโอน
  const payers = result.value
    .map((r: { name: string; diff: number }, i: number) => ({ ...r, idx: i }))
    .filter((r: { diff: number }) => r.diff < 0)
    .map((r: { name: string; diff: number; idx: number }) => ({
      ...r,
      remain: -r.diff,
    }));
  const receivers = result.value
    .map((r: { name: string; diff: number }, i: number) => ({ ...r, idx: i }))
    .filter((r: { diff: number }) => r.diff > 0)
    .map((r: { name: string; diff: number; idx: number }) => ({
      ...r,
      remain: r.diff,
    }));
  let payerIdx = 0,
    receiverIdx = 0;
  const newFlows: { from: string; to: string; amount: number }[] = [];
  while (payerIdx < payers.length && receiverIdx < receivers.length) {
    const payer = payers[payerIdx];
    const receiver = receivers[receiverIdx];
    const amount = Math.min(payer.remain, receiver.remain);
    if (amount > 0.009) {
      // ป้องกันเศษทศนิยมเล็ก ๆ
      newFlows.push({
        from: payer.name,
        to: receiver.name,
        amount: Math.round(amount * 100) / 100,
      });
    }
    payers[payerIdx].remain -= amount;
    receivers[receiverIdx].remain -= amount;
    if (Math.abs(payers[payerIdx].remain) < 0.01) payerIdx++;
    if (Math.abs(receivers[receiverIdx].remain) < 0.01) receiverIdx++;
  }
  flows.value = newFlows;
}
</script>
