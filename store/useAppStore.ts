import { create } from "zustand";

type AppState = {
  selectedMarket: string | null;
  setSelectedMarket: (market: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedMarket: null,
  setSelectedMarket: (market) => set({ selectedMarket: market }),
}));
