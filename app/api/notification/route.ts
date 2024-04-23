import {
  hourPayload,
  halfHourPayload,
  quarterHourPayload,
  eventConfirmationPayload,
} from "../../payloads";
import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

webPush.setVapidDetails(
  `mailto:${!process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
  process.env.WEB_PUSH_PRIVATE_KEY!
);

export const POST = async (req: NextRequest) => {
  console.log("Received a notification request");
  if (
    !process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.WEB_PUSH_PRIVATE_KEY
  ) {
    throw new Error("Environment variables supplied not sufficient.");
  }
  const { subscription } = (await req.json()) as {
    subscription: webPush.PushSubscription;
  };

  if (!subscription) {
    console.error("No subscription was provided!");
    return;
  }

  console.log("Received subscription:", subscription);

  webPush.sendNotification(subscription, hourPayload, {
    urgency: "high",
  });

  return NextResponse.json({ message: "success" });
};
