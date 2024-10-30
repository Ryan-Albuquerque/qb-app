export const dynamic = "force-dynamic";

import getConfig from "next/config";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { serverRuntimeConfig } = getConfig();
  const data = await request.json();

  if (!data.password || !data.document) {
    return new Response("Falta password e document", { status: 400 });
  }

  const loginRequest = await fetch(`${serverRuntimeConfig.API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await loginRequest.json();

  const json = result.error
    ? {
        error: result.error,
      }
    : {
        message: result.message,
      };

  cookies().set("token", result?.result?.token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return Response.json(json, {
    status: loginRequest.status,
  });
}
