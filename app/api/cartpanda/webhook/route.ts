import { NextRequest, NextResponse } from "next/server";

import {
  CartpandaWebhookError,
  CartpandaWebhookEvent,
  cartpandaConstants,
  getCartpandaHeaders,
  handleCartpandaEvent,
  parseCartpandaEvent,
  verifyCartpandaSignature,
} from "@/integrations/cartpanda";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeEvent(
  event: CartpandaWebhookEvent,
  fallbackType: string | null
): CartpandaWebhookEvent {
  if (event.type) {
    return event;
  }

  return {
    ...event,
    type: fallbackType ?? "unknown",
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const { signature, event } = getCartpandaHeaders(request);

  try {
    verifyCartpandaSignature(rawBody, signature);

    const payload = normalizeEvent(parseCartpandaEvent(rawBody), event);
    await handleCartpandaEvent(payload);

    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof CartpandaWebhookError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: webhookErrorHeaders("validation") }
      );
    }

    console.error("Cartpanda webhook handler failed", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: webhookErrorHeaders("internal") }
    );
  }
}

function webhookErrorHeaders(reason: "validation" | "internal") {
  return new Headers(
    reason === "validation"
      ? [[cartpandaConstants.eventHeader, "rejected-validation"]]
      : [[cartpandaConstants.eventHeader, "rejected-internal"]]
  );
}

