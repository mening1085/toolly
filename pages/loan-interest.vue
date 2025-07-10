<template>
  <div class="max-w-lg mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">📈 คำนวณดอกเบี้ยเงินกู้/บัตรเครดิต</h1>
    <p class="mb-4">เข้าใจหนี้ง่ายขึ้น</p>
    <form @submit.prevent="calculate" class="flex flex-col gap-3 mb-6">
      <div class="flex flex-col gap-2">
        <label class="font-medium">ยอดเงินต้น (บาท)</label>
        <input
          v-model.number="principal"
          type="number"
          min="1"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
          placeholder="เช่น 100000"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-medium">อัตราดอกเบี้ยต่อปี (%)</label>
        <input
          v-model.number="rate"
          type="number"
          min="0"
          step="0.01"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
          placeholder="เช่น 16"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-medium">จำนวนเดือน</label>
        <input
          v-model.number="months"
          type="number"
          min="1"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
          placeholder="เช่น 12"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-medium">ประเภทดอกเบี้ย</label>
        <select
          v-model="interestType"
          class="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="amortized">ลดต้นลดดอก (Amortized)</option>
          <option value="flat">คงที่ (Flat)</option>
          <option value="creditcard">บัตรเครดิต (จ่ายขั้นต่ำ)</option>
        </select>
      </div>
      <button
        type="submit"
        class="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-indigo-600 transition"
      >
        คำนวณ
      </button>
    </form>
    <div v-if="result" class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <div class="mb-2 font-bold text-lg">สรุปผล</div>
      <div class="mb-2">
        ยอดรวมที่ต้องจ่าย:
        <span class="text-pink-500 font-bold">{{
          result.totalPay.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
        }}</span>
        บาท
      </div>
      <div class="mb-2">
        ดอกเบี้ยรวม:
        <span class="text-blue-500 font-bold">{{
          result.totalInterest.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
        }}</span>
        บาท
      </div>
      <div class="mb-2">
        ผ่อน {{ months }} เดือน, ค่างวดเฉลี่ย:
        <span class="text-green-600 font-bold">{{
          result.avgPay.toLocaleString(undefined, { maximumFractionDigits: 2 })
        }}</span>
        บาท/เดือน
      </div>
      <div
        v-if="result.schedule && result.schedule.length"
        class="overflow-x-auto mt-4"
      >
        <table class="min-w-full text-xs border rounded">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="p-1">งวด</th>
              <th class="p-1">เงินต้น</th>
              <th class="p-1">ดอกเบี้ย</th>
              <th class="p-1">ยอดชำระ</th>
              <th class="p-1">เงินต้นคงเหลือ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in result.schedule"
              :key="i"
              class="border-b border-gray-100 dark:border-gray-800"
            >
              <td class="text-center">{{ row.no }}</td>
              <td class="text-right">
                {{
                  row.principal.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td class="text-right">
                {{
                  row.interest.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td class="text-right">
                {{
                  row.pay.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td class="text-right">
                {{
                  row.left.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const principal = ref<number | null>(null);
const rate = ref<number | null>(null);
const months = ref<number | null>(null);
const interestType = ref("amortized");
const result = ref<any>(null);

function calculate() {
  if (!principal.value || !rate.value || !months.value) {
    result.value = null;
    return;
  }
  const p = principal.value;
  const r = rate.value / 100 / 12;
  const n = months.value;
  let totalPay = 0;
  let totalInterest = 0;
  let avgPay = 0;
  let schedule: any[] = [];
  if (interestType.value === "amortized") {
    // ลดต้นลดดอก (Amortized)
    const pay = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let left = p;
    for (let i = 1; i <= n; i++) {
      const interest = left * r;
      const principalPay = pay - interest;
      left -= principalPay;
      schedule.push({
        no: i,
        principal: principalPay,
        interest,
        pay,
        left: left > 0 ? left : 0,
      });
      totalPay += pay;
      totalInterest += interest;
    }
    avgPay = pay;
  } else if (interestType.value === "flat") {
    // ดอกเบี้ยคงที่ (Flat)
    const interest = p * (rate.value / 100) * (n / 12);
    totalPay = p + interest;
    totalInterest = interest;
    avgPay = totalPay / n;
    for (let i = 1; i <= n; i++) {
      schedule.push({
        no: i,
        principal: p / n,
        interest: interest / n,
        pay: avgPay,
        left: p - (p / n) * i > 0 ? p - (p / n) * i : 0,
      });
    }
  } else if (interestType.value === "creditcard") {
    // บัตรเครดิต (จ่ายขั้นต่ำ 10%)
    let left = p;
    let i = 1;
    const minPayRate = 0.1;
    while (left > 1 && i <= 100) {
      const interest = left * r;
      let pay = Math.max(left * minPayRate, 200); // จ่ายขั้นต่ำ 10% หรือ 200 บาท
      if (pay > left + interest) pay = left + interest;
      const principalPay = pay - interest;
      left -= principalPay;
      schedule.push({
        no: i,
        principal: principalPay,
        interest,
        pay,
        left: left > 0 ? left : 0,
      });
      totalPay += pay;
      totalInterest += interest;
      i++;
      if (i > 120) break; // กัน loop infinity
    }
    avgPay = totalPay / (i - 1);
  }
  result.value = {
    totalPay,
    totalInterest,
    avgPay,
    schedule,
  };
}
</script>
