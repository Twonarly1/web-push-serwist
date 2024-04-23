interface NotificationAction {
  action: string;
  icon?: string;
  title: string;
}

interface NotificationOptions {
  actions?: NotificationAction[];
  badge?: string;
  body?: string;
  data?: any;
  dir?: NotificationDirection;
  icon?: string;
  image?: string;
  lang?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean | null;
  tag?: string;
  timestamp?: EpochTimeStamp;
  vibrate?: VibratePattern;
}

const actions: NotificationAction[] = [
  {
    action: "open_url",
    title: "Open Website",
  },
  { action: "dismiss", title: "Dismiss" },
];

const data = {
  options: {
    action: "open_url",
    // open url to /notifcation/user_id
    url: "https://google.com",
  },
};

// badges are platform-specific: Chrome/Android only

const hourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 1 hour!",
  icon: "/icons/timer-60_72x72.png", // 192x192
  //   icon: "/icons/android-chrome-192x192.png", // 192x192
  badge: "/icons/timer-60_72x72.png", // 72x72
  // image: "/icons/android-chrome-192x192.png", // 1440x720
  data,
  actions,
};

const halfHourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 30 minutes!",
  icon: "/icons/timer-30_72x72.png", // 192x192
  //   icon: "/icons/android-chrome-192x192.png", // 192x192
  badge: "/icons/timer-30_72x72.png", // 72x72
  // image: "/icons/android-chrome-192x192.png", // 1440x720
  data,
  actions,
};

const quarterHourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 15 minutes!",
  icon: "/icons/timer-15_72x72.png", // 192x192
  //   icon: "/icons/android-chrome-192x192.png", // 192x192
  badge: "/icons/timer-15_72x72.png", // 72x72
  // image: "/icons/android-chrome-192x192.png", // 1440x720
  data,
  actions,
};

const eventConfirmationOptions: NotificationOptions = {
  body: "Complete your appointment?",
  icon: "/icons/timer-15_72x72.png", // 192x192,
  //   icon: "/icons/android-chrome-192x192.png", // 192x192
  badge: "/icons/timer-15_72x72.png", // 72x72
  // image: "/icons/android-chrome-192x192.png", // 1440x720
  data: {
    options: [
      {
        action: "open_url",
        url: "https://google.com",
      },
      { action: "complete" },
      { action: "reschedule", url: "" },
    ],
  },
  actions: [
    {
      action: "open_url",
      title: "Open Website",
    },
    { action: "complete", title: "Complete" },
    { action: "reschedule", title: "Reschedule" },
  ],
};

const hourPayload = JSON.stringify({
  title: "1 hour reminder!",
  ...hourNoticationOptions,
});

const halfHourPayload = JSON.stringify({
  title: "30 min reminder!",
  ...halfHourNoticationOptions,
});

const quarterHourPayload = JSON.stringify({
  title: "15 minute reminder!",
  ...quarterHourNoticationOptions,
});

const eventConfirmationPayload = JSON.stringify({
  title: "Did you make it to your appointment!",
  ...eventConfirmationOptions,
});

export {
  hourPayload,
  halfHourPayload,
  quarterHourPayload,
  eventConfirmationPayload,
};
