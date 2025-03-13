
import { hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  return hashSync(password, 10);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return compareSync(password, hashPassword);
};
