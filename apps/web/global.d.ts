declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: "development" | "staging" | "production";
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_ARTIST_TOKEN_SMART_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_GOOGLE_AI_API_KEY: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_STAGING_API_URL: string;
      NEXT_PUBLIC_LOCAL_DEV_API_URL: string;
    }
  }
}

export {};
