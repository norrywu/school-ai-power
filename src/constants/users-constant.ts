import type { SheetField } from "@/components/sheet-trigger";
import type { UserRole } from "@/types/auth-type";
import type { UserMetadata } from "@/types/metadata";
import type { SelectOption } from "@/types/form";
import { ROLE_VALUES, type UserInput } from "@/validations/users-validation";

export const USERS_KEY = ["users"];

export const defaultUserMetadata: UserMetadata = {
  name: "Tamu",
  email: null,
  role: null,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  teacher: "Pengajar/Ustadz",
};

export const ROLE_OPTIONS: SelectOption<UserRole>[] = ROLE_VALUES.map(
  (role) => ({ value: role, label: ROLE_LABELS[role] }),
);

export const USER_FORM_DEFAULTS: UserInput = {
  name: "",
  email: "",
  password: "",
  role: "teacher",
};

export function userFields(isUbah: boolean): SheetField<UserInput>[] {
  return [
    {
      name: "name",
      label: "Nama lengkap",
      placeholder: "mis. Siti Aminah",
      autoComplete: "off",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "mis. siti@warung.com",
      autoComplete: "off",
    },
    {
      name: "password",
      label: isUbah ? "Kata sandi baru" : "Kata sandi",
      type: "password",
      placeholder: isUbah
        ? "Kosongkan bila tidak diubah"
        : "Minimal 8 karakter",
      autoComplete: "new-password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Pilih role",
      options: ROLE_OPTIONS,
    },
  ];
}
