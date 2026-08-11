import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  user: [
    "create",
    "list",
    "update",
    "delete",
    "set-role",
    "set-password",
    "set-email",
    "ban",
    "impersonate",
    "get",
  ],
} as const;

export const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
  user: [
    "create",
    "list",
    "update",
    "delete",
    "set-role",
    "set-password",
    "set-email",
    "ban",
    "impersonate",
    "get",
  ],
});

export const teacherRole = ac.newRole({
  user: ["list", "get"],
});

export const roles = {
  admin: adminRole,
  teacher: teacherRole,
};
