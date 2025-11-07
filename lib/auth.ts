import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";

import {
  SUPABASE_AUTH_COOKIE_NAME,
  getSupabaseAdmin,
} from "@/integrations/supabase-admin";

function getAccessTokenFromCookies(): string | null {
  const cookieValue = cookies().get(SUPABASE_AUTH_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookieValue);
    return parsed?.access_token ?? null;
  } catch (error) {
    console.warn("Failed to parse Supabase auth cookie", error);
    return null;
  }
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const accessToken = getAccessTokenFromCookies();

  if (!accessToken) {
    return null;
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !data?.user) {
    console.warn("Failed to fetch Supabase user", error);
    return null;
  }

  return data.user;
}
