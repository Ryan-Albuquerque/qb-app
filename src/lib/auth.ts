import { cookies } from "next/headers";

export const isAuthenticated = (): boolean => {
  const token = cookies().get("token")?.value;
  return !!token;
};
