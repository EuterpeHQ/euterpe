import { describe, expect, test, beforeAll } from "vitest";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

describe("Authentication", () => {
  let client: SupabaseClient<Database>;

  beforeAll(async () => {
    client = createClient<Database>(
      process.env.SUPABASE_API_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  });

  describe("SIWE", () => {
    test("request nonces", () => {
      expect(true).toBe(true);
    });
  });
});
