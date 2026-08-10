"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginSchema, type LoginFormValues } from "@/validations/auth-validation";
import { LOGIN_MESSAGES, AUTH_ROUTES } from "@/constants/auth-constant";
import type { AuthActionState } from "@/types/auth-type";

export async function signInAction(
  prevState: AuthActionState,
  payload: FormData | LoginFormValues
): Promise<AuthActionState> {
  let email = "";
  let password = "";

  if (payload instanceof FormData) {
    email = (payload.get("email") as string) || "";
    password = (payload.get("password") as string) || "";
  } else if (payload) {
    email = payload.email || "";
    password = payload.password || "";
  }

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return {
      success: false,
      error: LOGIN_MESSAGES.invalidInputError,
    };
  }

  try {
    const res = await auth.api.signInEmail({
      body: {
        email: validated.data.email,
        password: validated.data.password,
      },
      headers: await headers(),
      asResponse: true,
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { message?: string } | null;
      return {
        success: false,
        error: data?.message || LOGIN_MESSAGES.genericError,
      };
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : LOGIN_MESSAGES.genericError;
    return {
      success: false,
      error: errorMessage,
    };
  }

  redirect(AUTH_ROUTES.home);
}
