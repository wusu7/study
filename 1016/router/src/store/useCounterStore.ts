
import { create } from "zustand";
import type { CounterState } from "../types/counter";

export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: state.value - 1 })),
  incrementByAmount: (amount) =>
    set((state) => ({ value: state.value + amount })),
  reset: () => set({ value: 0 }),
}));
