import { ensureSupabaseUser } from "./supabase-admin";
import { sendWelcomeEmail } from "./resend";

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

export function parseCartpandaEvent<TData = unknown>(rawBody: string) {
  try {
    return JSON.parse(rawBody) as CartpandaWebhookEvent<TData>;
  } catch (error) {
    throw new CartpandaWebhookError("Invalid JSON payload");
  }
}

type CartpandaCustomer = {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
};

type CartpandaOrder = {
  id: string;
  number: string;
  customer?: CartpandaCustomer | null;
};

type OrderPaidPayload = {
  order: CartpandaOrder;
  [key: string]: unknown;
};

async function handleOrderPaid(
  event: CartpandaWebhookEvent<OrderPaidPayload>
) {
  const email = event.data?.order?.customer?.email?.trim();

  if (!email) {
    console.warn("Cartpanda order.paid received without customer email", {
      eventId: event.id,
      orderId: event.data?.order?.id,
    });
    return;
  }

  await ensureSupabaseUser(email);

  const customer = event.data?.order?.customer;
  const name = customer
    ? [customer.first_name, customer.last_name]
        .filter((part) => part && part.trim().length > 0)
        .join(" ") || customer.name || undefined
    : undefined;

  await sendWelcomeEmail({ email, name });
}

export async function handleCartpandaEvent(
  event: CartpandaWebhookEvent
): Promise<void> {
  switch (event.type) {
    case "order.paid":
      await handleOrderPaid(event as CartpandaWebhookEvent<OrderPaidPayload>);
      break;
    default: {
      console.info("Unhandled Cartpanda webhook", {
        type: event.type,
        id: event.id,
      });
    }
  }
}

