import { defineStore } from "pinia";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";

export interface Item {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  note: string;
  amount: number;
}

interface State {
  items: Item[];
}

export const useExpenseStore = defineStore("expense", {
  state: (): State => ({
    items: [],
  }),
  getters: {
    incomeTotal: (state) =>
      state.items
        .filter((i: Item) => i.type === "income")
        .reduce((sum: number, i: Item) => sum + i.amount, 0),
    expenseTotal: (state) =>
      state.items
        .filter((i: Item) => i.type === "expense")
        .reduce((sum: number, i: Item) => sum + i.amount, 0),
    balance: (state): number => {
      return (
        state.items
          .filter((i: Item) => i.type === "income")
          .reduce((sum: number, i: Item) => sum + i.amount, 0) -
        state.items
          .filter((i: Item) => i.type === "expense")
          .reduce((sum: number, i: Item) => sum + i.amount, 0)
      );
    },
  },
  actions: {
    addItem(item: Omit<Item, "id">) {
      this.items.push({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).slice(2),
      });
    },
    removeItem(id: string) {
      this.items = this.items.filter((i: Item) => i.id !== id);
    },
  },
  persist: <PersistenceOptions>{
    enabled: true,
    strategies: [
      {
        key: "toolly-expenses",
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
      },
    ],
  },
});
