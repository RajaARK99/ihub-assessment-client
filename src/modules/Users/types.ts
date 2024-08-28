import { z } from "zod";

export const roleEnum = z.enum(["User", "Admin", "Guest"]);

type RoleEnum = z.infer<typeof roleEnum>;
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: RoleEnum;
}

export type { User, RoleEnum };
