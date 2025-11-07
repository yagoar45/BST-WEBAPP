import crypto from "node:crypto";
import { Buffer } from "node:buffer";

const CARTPANDA_SIGNATURE_HEADER = "x-cartpanda-signature";
const CARTPANDA_EVENT_HEADER = "x-cartpanda-event";

export type CartpandaWebhookEvent<TData = unknown> = {
  id: string;
  type?: string;
  data: TData;
  created_at?: string;
  [key: string]: unknown;
};

export class CartpandaWebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CartpandaWebhookError";
  }
}

export function getCartpandaHeaders(request: Request) {
  const signature = request.headers.get(CARTPANDA_SIGNATURE_HEADER);
  const event = request.headers.get(CARTPANDA_EVENT_HEADER);

  return { signature, event };
}

export function verifyCartpandaSignature(
  rawBody: string,
  signature: string | null,
  secret = process.env.CARTPANDA_WEBHOOK_SECRET
) {
  if (!secret) {
    throw new CartpandaWebhookError(
      "Missing CARTPANDA_WEBHOOK_SECRET environment variable"
    );
  }

  if (!signature) {
    throw new CartpandaWebhookError(
      `Missing ${CARTPANDA_SIGNATURE_HEADER} header`
    );
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const provided = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (
    provided.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(provided, expectedBuffer)
  ) {
    throw new CartpandaWebhookError("Invalid webhook signature");
  }
}

export function parseCartpandaEvent<TData = unknown>(rawBody: string) {
  try {
    return JSON.parse(rawBody) as CartpandaWebhookEvent<TData>;
  } catch (error) {
    throw new CartpandaWebhookError("Invalid JSON payload");
  }
}

export async function handleCartpandaEvent(
  event: CartpandaWebhookEvent
): Promise<void> {
  switch (event.type) {
    default: {
      console.info("Unhandled Cartpanda webhook", {
        type: event.type,
        id: event.id,
      });
    }
  }
}

export const cartpandaConstants = {
  signatureHeader: CARTPANDA_SIGNATURE_HEADER,
  eventHeader: CARTPANDA_EVENT_HEADER,
};

