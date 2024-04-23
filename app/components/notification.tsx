"use client";
import useStore from "../store";

import type { MouseEventHandler } from "react";

const Notification = () => {
  const { isSubscribed, subscription } = useStore(
    ({ isSubscribed, subscription }) => ({
      isSubscribed,
      subscription,
    })
  );

  const sendNotificationButtonOnClick: MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();

    if (!subscription) {
      alert("Web push not subscribed");
      return;
    }

    try {
      await fetch("https://web-push-serwist.vercel.app/api/notification", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subscription,
        }),

        signal: AbortSignal.timeout(10000),
      });
      alert("Notification sent!");
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "TimeoutError") {
          console.error("Timeout: It took too long to get the result.");
        } else if (err.name === "AbortError") {
          console.error(
            "Fetch aborted by user action (browser stop button, closing tab, etc.)"
          );
        } else if (err.name === "TypeError") {
          console.error("The AbortSignal.timeout() method is not supported.");
        } else {
          // A network error, or some other problem.
          console.error(`Error: type: ${err.name}, message: ${err.message}`);
        }
      } else {
        console.error(err);
      }
      alert("An error happened.");
    }
  };

  // if (!isSubscribed) return null;

  return (
    <>
      <button
        type="button"
        onClick={sendNotificationButtonOnClick}
        disabled={!isSubscribed}
      >
        Send Notification
      </button>
    </>
  );
};

export default Notification;
