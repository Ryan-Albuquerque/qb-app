export default async function callLoginService(data: unknown) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}
