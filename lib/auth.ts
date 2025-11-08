import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "bst-session";

export async function getAuthenticatedEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}
