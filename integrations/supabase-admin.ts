import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  "https://wcphbjrnbrxfrdfecpoe.supabase.co";

export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

type SupabaseAdminClient = ReturnType<typeof createClient> | null;

let cachedAdminClient: SupabaseAdminClient = null;

export const SUPABASE_PROJECT_REF = new URL(SUPABASE_URL).hostname.split(".")[0];

export const SUPABASE_AUTH_COOKIE_NAME = `sb-${SUPABASE_PROJECT_REF}-auth-token`;

export function getSupabaseAdmin() {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or NEXT_SUPABASE_SERVICE_ROLE_KEY) environment variable"
    );
  }

  if (!cachedAdminClient) {
    cachedAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return cachedAdminClient;
}

export async function ensureSupabaseUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: normalizedEmail,
    email_confirm: true,
  });

  if (error) {
    if (error.status === 422 || error.message.includes("already registered")) {
      return;
    }

    throw error;
  }
}

export async function findSupabaseUserByEmail(email: string) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or NEXT_SUPABASE_SERVICE_ROLE_KEY) environment variable"
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  const url = new URL("/auth/v1/admin/users", SUPABASE_URL);
  url.searchParams.set("email", normalizedEmail);

  const response = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Supabase user: ${response.status}`);
  }

  const data = (await response.json()) as {
    users?: Array<{ id: string; email?: string }>;
  };

  const matchedUser = data.users?.find(
    (user) => user.email?.trim().toLowerCase() === normalizedEmail
  );

  return matchedUser ?? null;
}
