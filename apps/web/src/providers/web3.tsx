"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  Theme,
  darkTheme,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { createConfig, http } from "@wagmi/core";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
  trustWallet,
  phantomWallet,
  safeWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, coinbaseWallet, rainbowWallet],
    },
    {
      groupName: "Others",
      wallets: [
        walletConnectWallet,
        trustWallet,
        phantomWallet,
        injectedWallet,
        safeWallet,
      ],
    },
  ],
  {
    appName: "Euterpe",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  },
);

export const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: connectors,
  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
  },
});

const queryClient = new QueryClient();

const customTheme: Theme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: "#c1ff72",
    accentColorForeground: "#292929",
    connectButtonText: "#000000",
    modalBackground: "#292929",
    modalText: "#ffffffb8",
    modalTextSecondary: "#757575",
  },
  radii: {
    ...darkTheme().radii,
    actionButton: "12px",
  },
};

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://euterpe.vercel.app/terms-of-service">
      Terms of Service
    </Link>{" "}
    and acknowledge you have read and understand the protocol{" "}
    <Link href="https://euterpe.vercel.app/disclaimer">Disclaimer</Link>
  </Text>
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "Euterpe",
            learnMoreUrl: "https://euterpe.vercel.app/learn/defi-for-artists",
            disclaimer: Disclaimer,
          }}
          theme={customTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
