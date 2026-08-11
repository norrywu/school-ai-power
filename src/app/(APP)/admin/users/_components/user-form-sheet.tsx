"use client";

import { TriggerSheet } from "@/components/sheet-trigger";
import { USER_FORM_DEFAULTS, userFields } from "@/constants/users-constant";
import { useCreateUser, useUpdateUser } from "@/hooks/use-users";
import type { AuthUser } from "@/types/auth-type";
import {
  userSchema,
  updateUserSchema,
  type UserInput,
} from "@/validations/users-validation";

interface UserFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: AuthUser | null;
}

export function UserFormSheet({
  open,
  onOpenChange,
  userToEdit,
}: UserFormSheetProps) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const isEditing = Boolean(userToEdit);

  const defaultValues: UserInput =
    isEditing && userToEdit
      ? {
          name: userToEdit.name || "",
          email: userToEdit.email || "",
          password: "",
          role: userToEdit.role || "teacher",
        }
      : USER_FORM_DEFAULTS;

  const handleSubmit = (data: UserInput) => {
    if (isEditing && userToEdit) {
      updateUser.mutate(
        { userId: userToEdit.id, data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createUser.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending = createUser.isPending || updateUser.isPending;

  return (
    <TriggerSheet<UserInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={userFields(isEditing)}
      sheetTitle={isEditing ? "Ubah Data Pengguna" : "Tambah Pengguna Baru"}
      sheetDescription={
        isEditing
          ? "Ubah data akun atau peran pengguna."
          : "Isi data akun pengguna baru di lingkungan Pondok Pesantren."
      }
      defaultValues={defaultValues}
      schema={isEditing ? (updateUserSchema as never) : userSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Pengguna"}
      isPending={isPending}
    />
  );
}
