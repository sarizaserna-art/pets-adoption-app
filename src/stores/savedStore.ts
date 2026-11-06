// src/stores/savedStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Item } from '../types';

interface SavedStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isItemSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const alreadySaved = get().items.some((i) => i.id === item.id);
        if (alreadySaved) return;
        set((state) => ({ items: [...state.items, item] }));
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
      clearAll: () => set({ items: [] }),
      isItemSaved: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    {
      name: 'pets-saved-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);