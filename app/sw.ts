import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/inject-manifest/configuring
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
      self.registration
    );
  }
});

const showLocalNotification = (
  title: string,
  body: string,
  icon: string,
  actions: NotificationAction[],
  swRegistration: ServiceWorkerRegistration
) => {
  swRegistration.showNotification(title, {
    body,
    icon,
    actions,
    requireInteraction: true,
  });
};

serwist.addEventListeners();
