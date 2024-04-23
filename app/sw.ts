import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

self.addEventListener("push", async (event) => {
  if (event.data) {
    const eventData = await event.data.json();
    // TODO: refactor
    showLocalNotification(
      eventData.title,
      eventData.body,
      eventData.icon,
      eventData.actions,
      eventData.badge,
      eventData.image,
      eventData.data,
      self.registration
    );
  }
});

const showLocalNotification = (
  title: string,
  body: string,
  icon: string,
  actions: NotificationAction[],
  badge: string,
  image: string,
  data: any,
  swRegistration: ServiceWorkerRegistration
) => {
  swRegistration.showNotification(title, {
    body,
    icon,
    actions,
    badge,
    image,
    data,
    requireInteraction: true,
  });
};

self.addEventListener("notificationclick", function (event) {
  var notification = event.notification;
  var action = event.action;

  console.log(notification);
  console.log("Clicked action:", action);

  if (!notification.data.hasOwnProperty("options")) return;

  var options = notification.data.options;

  var clickedOption = options.find((option: any) => option.action === action);

  if (!clickedOption) return;

  // Fix this.
  switch (clickedOption.action) {
    case "dismiss":
      console.log("Dismiss event");
      notification.close();
      break;
    case "open_url":
      console.log("Opening URL:", clickedOption.url);
      self.clients.openWindow(clickedOption.url);
      break;
    case "complete":
      console.log("Complete event");
      // Perform actions for completing event
      break;
    case "reschedule":
      console.log("Reschedule event");
      // Perform actions for rescheduling event
      break;
    default:
      console.log("Unknown action");
  }
});

serwist.addEventListeners();
