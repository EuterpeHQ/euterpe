import { SidebarStoreProvider } from "./sidebar.store";
import { CreateHarmonyStoreProvider } from "./createHarmony.store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarStoreProvider>
      <CreateHarmonyStoreProvider>{children}</CreateHarmonyStoreProvider>
    </SidebarStoreProvider>
  );
}
