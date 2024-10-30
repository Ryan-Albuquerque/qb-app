import CreateSession from "@/components/pages/CreateSession";
import { isAuthenticated } from "@/lib/auth";
import { callGetCategories } from "@/lib/services/session";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function CreateSessionPage() {
  if (!isAuthenticated()) {
    redirect("/");
  }
  const data = await callGetCategories();

  if (data.error) {
    redirect(`/auth/login?error=${data.error}`);
  }

  return (
    <>
      <CreateSession subjectData={data} />
    </>
  );
}
