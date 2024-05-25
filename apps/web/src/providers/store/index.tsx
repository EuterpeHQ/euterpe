import { SidebarStoreProvider } from "./sidebar.store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <SidebarStoreProvider>{children}</SidebarStoreProvider>;
}
