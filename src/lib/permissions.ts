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
  santri: ["create", "list", "get", "update", "delete"],
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
  santri: ["create", "list", "get", "update", "delete"],
});

export const teacherRole = ac.newRole({
  user: ["list", "get"],
  santri: ["list", "get"],
});

export const roles = {
  admin: adminRole,
  teacher: teacherRole,
};
