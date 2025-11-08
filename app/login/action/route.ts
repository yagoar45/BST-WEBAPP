import { NextRequest, NextResponse } from "next/server";

import { findSupabaseUserByEmail } from "@/integrations/supabase-admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

const APP_BASE_URL = process.env.APP_BASE_URL;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || email.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await findSupabaseUserByEmail(normalizedEmail);

  const redirectParam = formData.get("redirect_to");
  const redirectTarget =
    typeof redirectParam === "string" && redirectParam.trim().length > 0
      ? redirectParam.trim()
      : "/materials";

  const baseUrl = APP_BASE_URL ?? request.nextUrl.origin;

  const finalRedirect = redirectTarget.startsWith("http")
    ? redirectTarget
    : new URL(redirectTarget, baseUrl).toString();

  if (!user) {
    const loginUrl = new URL(
      `/login?${new URLSearchParams({ error: "not_found", email: normalizedEmail }).toString()}`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(finalRedirect);
  response.cookies.set(SESSION_COOKIE_NAME, normalizedEmail, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
