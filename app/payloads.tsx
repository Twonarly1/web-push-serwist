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

const data = {
  options: [
    {
      action: "open_url",
      url: "https://google.com",
    },
    {
      action: "dismiss",
    },
  ],
};
const actions = [
  {
    action: "open_url",
    title: "Open Website",
  },
  {
    action: "dismiss",
    title: "Dismiss",
  },
];
// badge --> Chrome/Android only: 72x72 PNG
const badge = "/icons/maskable-icon-72.png";
// icon --> Android and Desktop only: 192x192 PNG
// image --> Android and Windows only: aspect ratio 2:1, 1440x720, maxWidth: 2000, minWidth: 300: JPG

const hourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 1 hour!",
  icon: "/icons/timer-60_192.png",
  badge,
  data,
  actions,
  // tag: "hour",
};

const halfHourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 30 minutes!",
  icon: "/icons/timer-30_192.png",
  badge,
  data,
  actions,
  // tag: "half-hour",
};

const quarterHourNoticationOptions: NotificationOptions = {
  body: "Your appointment is coming up in 15 minutes!",
  icon: "/icons/timer-15_192.png",
  badge,
  data,
  actions,
  // tag: "quarter-hour",
};

const eventConfirmationOptions: NotificationOptions = {
  body: "Complete your appointment?",
  badge,
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
