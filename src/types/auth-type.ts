export type AuthActionState = {
  success?: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string[]>;
};
