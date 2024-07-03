"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import {
  type CreateHarmonyStore,
  createCreateHarmonyStore,
} from "@/store/createHarmony.store";

export const CreateHarmonyStoreContext =
  createContext<StoreApi<CreateHarmonyStore> | null>(null);

export interface CreateHarmonyStoreProviderProps {
  children: ReactNode;
}

export const CreateHarmonyStoreProvider = ({
  children,
}: CreateHarmonyStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CreateHarmonyStore>>();
  if (!storeRef.current) {
    storeRef.current = createCreateHarmonyStore();
  }

  return (
    <CreateHarmonyStoreContext.Provider value={storeRef.current}>
      {children}
    </CreateHarmonyStoreContext.Provider>
  );
};

export const useCreateHarmonyStore = <T,>(
  selector: (store: CreateHarmonyStore) => T,
): T => {
  const createHarmonyStoreContext = useContext(CreateHarmonyStoreContext);

  if (!createHarmonyStoreContext) {
    throw new Error(
      `useCreateHarmonyStore must be use within CreateHarmonyStoreProvider`,
    );
  }

  return useStore(createHarmonyStoreContext, selector);
};
