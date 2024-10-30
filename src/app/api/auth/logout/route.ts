export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  cookies().delete("token");
  return redirect("/");
}
