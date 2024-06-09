declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      SUPABASE_API_URL: string;
      SUPABASE_ANON_KEY: string;
    }
  }
}

export {};
