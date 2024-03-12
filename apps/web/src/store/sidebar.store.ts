import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  isExpanded: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  mode: "creator" | "investor" | null;
  setMode: (mode: "creator" | "investor" | null) => void;
  _hasHydrated: boolean;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: false,
      isExpanded: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      setIsExpanded: (isExpanded) => set({ isExpanded }),
      mode: null,
      setMode: (mode) => set({ mode }),
      _hasHydrated: false,
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isExpanded: state.isExpanded }),
      onRehydrateStorage: (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    },
  ),
);
