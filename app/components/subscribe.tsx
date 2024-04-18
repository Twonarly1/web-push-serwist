"use client";

import { useEffect } from "react";
import useStore from "../store";

import type { MouseEventHandler } from "react";

const Subscribe = () => {
  const {
    installed,
    isSubscribed,
    setIsSubscribed,
    setSubscription,
    registration,
    setRegistration,
  } = useStore(
    ({
      installed,
      isSubscribed,
      setIsSubscribed,
      setSubscription,
      registration,
      setRegistration,
    }) => ({
      installed,
      isSubscribed,
      setIsSubscribed,
      setSubscription,
      registration,
      setRegistration,
    })
  );

  const subscribeButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
      throw new Error("Environment variables supplied not sufficient.");
    }
    if (!registration) {
      console.error("No SW registration available.");
      return;
    }
    event.preventDefault();
    try {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(
          process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
        ),
      });
      // TODO: you should call your API to save subscription data on the server in order to send web push notification from the server
      setSubscription(sub);
      setIsSubscribed(true);
      alert("Web push subscribed!");
      console.log(sub);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error: type: ${err.name}, message: ${err.message}`);
      } else {
        console.error(err);
      }
      alert("Make sure you have notifications allowed for this site.");
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serwist !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  // if (!installed) return null;

  return (
    <button
      type="button"
      onClick={subscribeButtonOnClick}
      disabled={isSubscribed}
    >
      Subscribe
    </button>
  );
};

export default Subscribe;

const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
