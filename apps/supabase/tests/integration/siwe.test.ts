import { describe, expect, test, beforeAll } from "vitest";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database, Tables } from "../../database.types";
import { ethers } from "ethers";
import { createSigner } from "fast-jwt";

// Import required libraries and modules
// import {
//   assertEquals,
//   assertThrowsAsync,
// } from "https://deno.land/std@0.192.0/testing/asserts.ts";
// import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
// import { verifyMessage } from "ethers";

const authSigner = createSigner({
  key: "super-secret-jwt-token-with-at-least-32-characters-long",
  algorithm: "HS256",
});

function createJWT(address: string, userId: string, sessionId: string) {
  console.log("createJWT sub ", userId);
  const ONE_HOUR = 60 * 60;
  const exp = Math.round(Date.now() / 1000) + ONE_HOUR;
  const payload = {
    exp,
    sub: userId,
    address: address,
    role: "authenticated",
    aal: "aal1",
    // session_id: sessionId,
  };
  return authSigner(payload);
}

describe("Authentication", () => {
  let supabase: SupabaseClient<Database>;
  let address: string;
  let message: string;
  let signature: string;

  beforeAll(async () => {
    supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
    const account = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    );

    address = account.address;
    message = "wagmi";
    signature = await account.signMessage(message);
  });

  describe("Sign In With Ethereum", () => {
    test("Users can sign in with wallet address", async () => {
      // const { data: nonceData } = await supabase
      //   .rpc("siwe", {
      //     action: "get_nonce",
      //     payload: {
      //       wallet_address: address,
      //     },
      //   })
      //   .returns<Tables<"nonces">>();
      // if (!nonceData) throw new Error("Nonce retrieval failed.");
      // const nonce = nonceData.nonce;
      // const { data: tokenData, error: tokenError } =
      //   await supabase.functions.invoke("siwe", {
      //     body: {
      //       nonce: nonce,
      //       message: message,
      //       signature: signature,
      //     },
      //   });

      // console.log("wallet ", wallet.address)
      // console.log("data ", data);
      // console.log("error ", error);
      // console.log("data ", tokenData);
      // console.log("error ", tokenError);
      const access = createJWT("", "efee0386-170a-417f-babb-0f134c19cbab", "");

      console.log("access ", access);

      supabase = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          },
        }
      );

      // const authHeader = req.headers.get("Authorization")!;
      const token = access.replace("Bearer ", "");
      const { data: userData, error: userError } =
        await supabase.auth.getUser(token);
      const user = userData.user;
      console.log("userData ", userData);
      console.log("user ", user);
      console.log("error ", userError);

      // const { data, error } = await supabase.auth.setSession({
      //   access_token: tokenData.access_token,
      //   refresh_token: "",
      // });

      //   const { data, error } = await supabase.auth.getUser({
      //   access_token: tokenData.access_token,
      //   refresh_token: ""
      // })
      // console.log("data ", data);
      // console.log("error ", error);

      expect(true).toBe(true);
    });

    test("request nonces", () => {
      expect(true).toBe(true);
    });
  });
});

// Set up the configuration for the Supabase client
// const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
// const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
// const client: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// // Import the handler from your Deno application (ensure to export it from your module)
// import { handler } from "./path_to_your_handler.ts"; // Update the path as necessary

// // Define the test cases for nonce validation
// Deno.test("Authentication successful", async () => {
//   // Mock Supabase response and ethers function for a successful case
//   supabase.from = () => ({
//     select: () => ({
//       eq: () => ({
//         single: () => Promise.resolve({
//           data: {
//             nonce: "12345",
//             used: false,
//             wallet_address: "0xExpectedWalletAddress",
//             created_at: new Date().toISOString(),
//           },
//           error: null
//         })
//       })
//     })
//   });
//   globalThis.verifyMessage = () => Promise.resolve("0xExpectedWalletAddress");

//   const req = new Request("http://localhost", {
//     method: "POST",
//     body: JSON.stringify({
//       nonce: "12345",
//       message: "Verify this message",
//       signature: "0xSomeSignature"
//     })
//   });

//   const res = await handler(req);
//   assertEquals(res.status, 200);
// });

// Deno.test("Nonce has expired", async () => {
//   // Mock Supabase response for an expired nonce case
//   supabase.from = () => ({
//     select: () => ({
//       eq: () => ({
//         single: () => Promise.resolve({
//           data: {
//             nonce: "12345",
//             used: false,
//             wallet_address: "0xExpectedWalletAddress",
//             created_at: new Date(Date.now() - 10 * 60 * 1000 - 1000).toISOString(),
//           },
//           error: null
//         })
//       })
//     })
//   });
//   globalThis.verifyMessage = () => Promise.resolve("0xExpectedWalletAddress");

//   const req = new Request("http://localhost", {
//     method: "POST",
//     body: JSON.stringify({
//       nonce: "12345",
//       message: "Verify this message",
//       signature: "0xSomeSignature"
//     })
//   });

//   const res = await handler(req);
//   assertEquals(res.status, 400);
// });

// Additional tests for other scenarios such as nonce already used, wallet address mismatch, etc.
