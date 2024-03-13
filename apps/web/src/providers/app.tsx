import React from "react";
import { ThemeProvider } from "./theme";
import { Web3Provider } from "./web3";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Web3Provider>{children}</Web3Provider>
    </ThemeProvider>
  );
}
