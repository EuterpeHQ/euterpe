import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const expiresIn = 60 * 60 * 24 * 30;

  const payload = {
    // ...result.data,
    // iat: Math.floor(Date.now() / 1000),
    // exp: Math.floor(Date.now() / 1000) + expiresIn,
  };
  const supabaseJWT = jwt.sign(
    {
      ...payload,
    },
    process.env.SUPABASE_JWT_SECRET!,
    {
      expiresIn,
    },
  );
  console.log({
    access_token: supabaseJWT,
  });
  return {
    access_token: supabaseJWT,
  };

  const accessToken = request.cookies.get("sb-access-token")?.value;
  console.log("accessToken, ", accessToken);
  // console.log(request.headers);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}
