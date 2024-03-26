"use server";

import { getServerActionAuth } from "@/lib/auth";

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = getServerActionAuth();

    const { data, error } = await auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.session) throw new Error("No session");
    return { errorMessage: null };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
};
