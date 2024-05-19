import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type SidebarState = {
  isOpen: boolean;
  isExpanded: boolean;
  mode: "creator" | "investor" | null;
  _hasHydrated: boolean;
};

export type SidebarActions = {
  setIsOpen: (isOpen: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setMode: (mode: "creator" | "investor" | null) => void;
};

export type SidebarStore = SidebarState & SidebarActions;

// export const initSidebarStore = (): SidebarState => {
//   return { _hasHydrated: false, isOpen: false, isExpanded: false, mode: null };
// };

export const defaultInitState: SidebarState = {
  _hasHydrated: false,
  isOpen: false,
  isExpanded: false,
  mode: null,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState,
) => {
  return createStore<SidebarStore>()(
    persist(
      (set) => ({
        ...initState,
        setIsOpen: (isOpen) => set({ isOpen }),
        setIsExpanded: (isExpanded) => set({ isExpanded }),
        setMode: (mode) => set({ mode }),
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
};
