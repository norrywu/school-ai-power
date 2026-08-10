export type AuthActionState = {
  success?: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string[]>;
};

export type UserRole = "admin" | "teacher";

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  role: UserRole | null;
};
