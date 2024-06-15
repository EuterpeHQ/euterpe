import { describe, expect, test, beforeAll } from "vitest";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

/* 
  Local database testing dependencies
  - Email confirmation is turned off
  - Anonymous sign in is turned on
  - Test user, test@gmail.com & Test1234
 */

describe("Authentication", () => {
  let client: SupabaseClient<Database>;

  beforeAll(async () => {
    client = createClient<Database>(
      process.env.SUPABASE_API_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  });

  describe("SIWE", () => {
        test("Users can sign in anonymously", async () => {
      const result = await client.auth.signInAnonymously()
      expect(true).toBe(true);
    });

    test("request nonces", () => {
      expect(true).toBe(true);
    });
  });
});
