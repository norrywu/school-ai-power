"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { FormField } from "@/components/common/form";
import { PasswordInput } from "@/components/common/password-input";
import { LOGIN_MESSAGES, AUTH_ROUTES } from "@/constants/auth-constant";
import { useLoginForm } from "@/hooks/use-login-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, error, isLoading, onSubmit } = useLoginForm();

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{LOGIN_MESSAGES.title}</h1>
          <p className="text-sm text-balance text-muted-foreground">
            {LOGIN_MESSAGES.description}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm font-medium text-destructive text-center">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          autoComplete="email"
        />

        <PasswordInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          labelSuffix={
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {LOGIN_MESSAGES.forgotPasswordText}
            </a>
          }
        />

        <Field>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? LOGIN_MESSAGES.loadingText : LOGIN_MESSAGES.submitText}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          {LOGIN_MESSAGES.noAccountText}{" "}
          <a href={AUTH_ROUTES.register} className="underline underline-offset-4">
            {LOGIN_MESSAGES.signUpText}
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
