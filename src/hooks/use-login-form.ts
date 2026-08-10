"use client";

import { useActionState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/validations/auth-validation";
import { DEFAULT_LOGIN_VALUES } from "@/constants/auth-constant";
import { signInAction } from "@/servers/auth";
import type { AuthActionState } from "@/types/auth-type";

const initialActionState: AuthActionState = {
  success: false,
  error: null,
};

export function useLoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialActionState
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
  });

  function onSubmit(values: LoginFormValues) {
    startTransition(() => {
      formAction(values);
    });
  }

  return {
    form,
    error: state.error,
    isLoading: isPending,
    onSubmit,
  };
}
