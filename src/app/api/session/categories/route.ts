export const dynamic = "force-dynamic";

import getConfig from "next/config";

export const revalidate = 0;
export async function GET(req: Request) {
  const { serverRuntimeConfig } = getConfig();

  const token = req?.headers?.get("authorization");

  const categoriesRequest = await fetch(
    `${serverRuntimeConfig.API_URL}/categories/nested`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await categoriesRequest.json();

  const json = result.error
    ? {
        error: result.error,
      }
    : {
        result: result.result,
      };
  return Response.json(json, {
    status: categoriesRequest.status,
  });
}
