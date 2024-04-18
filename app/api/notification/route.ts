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

  const payload = JSON.stringify({
    title: "WebPush Notification!",
    body: "Hello World",
    icon: "/icons/android-chrome-192x192.png",
    actions: [
      {
        action: "open_url",
        title: "Open Website",
        icon: "/icons/favicon-16x16.png",
      },
      { action: "dismiss", title: "Dismiss", icon: "/icons/favicon-16x16.png" },
    ],
  });

  webPush.sendNotification(subscription, payload);

  return NextResponse.json({ message: "success" });
};

// interface NotificationOptions {
//   actions?: NotificationAction[];
//   badge?: string;
//   body?: string;
//   data?: any;
//   dir?: NotificationDirection;
//   icon?: string;
//   image?: string;
//   lang?: string;
//   renotify?: boolean;
//   requireInteraction?: boolean;
//   silent?: boolean | null;
//   tag?: string;
//   timestamp?: EpochTimeStamp;
//   vibrate?: VibratePattern;
// }
