import type { Role } from "./Role";

export interface RegisterForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}