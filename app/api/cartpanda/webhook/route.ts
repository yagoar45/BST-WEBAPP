import { NextRequest, NextResponse } from "next/server";

import {
  CartpandaWebhookError,
  CartpandaWebhookEvent,
  handleCartpandaEvent,
  parseCartpandaEvent,
} from "@/integrations/cartpanda";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeEvent(event: CartpandaWebhookEvent): CartpandaWebhookEvent {
  if (event.type) {
    return event;
  }

  return {
    ...event,
    type: "unknown",
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  try {
    const payload = normalizeEvent(parseCartpandaEvent(rawBody));
    await handleCartpandaEvent(payload);

    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof CartpandaWebhookError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.error("Cartpanda webhook handler failed", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

