import { createStore } from "zustand/vanilla";

export type CreateHarmonyState = {
  harmonyCategory: string;
  harmonyType: string;
};

export type CreateHarmonyActions = {
  setHarmonyCategory: (harmonyCategory: string) => void;
  setHarmonyType: (harmonyType: string) => void;
};

export type CreateHarmonyStore = CreateHarmonyState & CreateHarmonyActions;

export const defaultInitState: CreateHarmonyState = {
  harmonyCategory: "",
  harmonyType: "",
};

export const createCreateHarmonyStore = (
  initState: CreateHarmonyState = defaultInitState,
) => {
  return createStore<CreateHarmonyStore>()((set) => ({
    ...initState,
    setHarmonyCategory: (harmonyCategory) => set({ harmonyCategory }),
    setHarmonyType: (harmonyType) => set({ harmonyType }),
  }));
};
