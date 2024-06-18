/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";
import { verifyMessage } from "ethers";
import { createSigner } from "fast-jwt";
import { v4 as uuidv4 } from "uuid";
import { randomBytes } from "crypto";

console.log("secret ", Deno.env.get("SUPABASE_AUTH_JWT_SECRET"));
console.log("URL ", Deno.env.get("SUPABASE_URL"));
console.log("JWT ", Deno.env.get("JWT_SECRET"));

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

type SIWERequest = {
  nonce: string;
  message: string;
  signature: `0x${string}`;
};

const NONCE_EXPIRY = 5 * 60 * 1000;

Deno.serve(async (req: Request) => {
  try {
    const { nonce, message, signature }: SIWERequest = await req.json();
    const signer = await verifyMessage(message, signature);
    console.log("signer ", signer);

    const { data: nonceData, error: nonceError } = await supabase
      .from("nonces")
      .select("*")
      .eq("nonce", nonce)
      .single();
    console.log("data ", nonceData);
    console.log("error ", nonceError);
    if (nonceError)
      throw new Error("Nonce retrieval failed: " + nonceError.message);
    if (!nonceData) throw new Error("Nonce does not exist.");
    if (nonceData.used) throw new Error("Nonce has already been used.");
    if (nonceData.wallet_address !== signer)
      throw new Error("Wallet address does not match the signer.");
    const nonceCreationTime = new Date(nonceData.created_at);
    const expiryTime = new Date(nonceCreationTime.getTime() + NONCE_EXPIRY);
    if (new Date() > expiryTime) throw new Error("Nonce has expired.");
    const { data: updateData, error: updateError } = await supabase
      .from("nonces")
      .update({ used: true })
      .eq("nonce", nonce);
    console.log("update data, ", updateData);
    console.log("nonce error, ", updateError);
    if (updateError)
      throw new Error("Failed to update nonce: " + updateError.message);
    const sessionId = uuidv4();
    // console.log("session id ", sessionId);
    // console.log("user id ", nonceData.user_id);
    // const { data: sessionData, error: sessionError } = await supabase
    //   .from("auth.sessions")
    //   .insert({
    //     id: sessionId,
    //     user_id: nonceData.user_id,
    //     created_at: "2024-06-16 17:46:22.043188+00",
    //     aal: "aal1",
    //   });
    // console.log("sessionData", sessionData);
    // console.log("sessionError", sessionError);

    // if (sessionError & (sessionError !== {}))
    //   throw new Error("Failed to insert new session: " + sessionError.message);

    // const refreshToken = "nelaCZGd9pG79NVQA_ar8Q";
    // const { data: refreshTokenData, error: refreshTokenError } = await supabase
    //   .from("refresh_tokens")
    //   .insert({
    //     // token_id: uuidv4(),
    //     token: refreshToken,
    //     user_id: nonceData.user_id,
    //     created_at: new Date().toISOString(),
    //     updated_at: new Date().toISOString(),
    //     // used: false
    //   });

    // console.log("refreshTokenData", refreshTokenData);
    // console.log("refreshTokenError", refreshTokenError);

    // console.log("signer ", signer);
    // console.log("user ", nonceData.user_id);
    // console.log("refresh ", generateRefreshToken())
    const token = createJWT(signer, nonceData.user_id, sessionId);

    console.log("token  ===== ", token);
    return new Response(
      JSON.stringify({
        access_token: token,
        // refresh_token: refreshToken,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message + "wahatt" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});

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

function generateRefreshToken() {
  const buffer = ethers.randomBytes(32); // Adjust size as needed
  // let token = buffer.toString('base64');  // Convert to base64
  // token = token.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Make URL-safe and remove padding
  return buffer;
}

// function createRefreshToken ( userId: string, sessionId: string) {

//   authSigner({

//     sub: userId,
//     "session_id": sessionId,

//         })

//       }
