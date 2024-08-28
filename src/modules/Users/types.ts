import { z } from "zod";

export const roleEnum = z.enum(["User", "Admin", "Guest"]);
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: z.infer<typeof roleEnum>;
}

export type { User };
