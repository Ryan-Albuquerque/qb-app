export const dynamic = "force-dynamic";

import getConfig from "next/config";

export async function POST(request: Request) {
  const { serverRuntimeConfig } = getConfig();
  const data = await request.json();

  if (
    !data.password ||
    !data.document ||
    !data.confirmPassword ||
    !data.phone ||
    !data.name ||
    !data.email
  ) {
    return new Response("Objeto inválido", { status: 400 });
  }

  const registerRequest = await fetch(
    `${serverRuntimeConfig.API_URL}/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await registerRequest.json();

  const json = result.error
    ? {
        error: result.error,
      }
    : {
        message: result.message,
      };
  return Response.json(json, {
    status: registerRequest.status,
  });
}
