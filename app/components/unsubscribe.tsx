"use client";

import useStore from "../store";

import type { MouseEventHandler } from "react";

const Unsubscribe = () => {
  const { isSubscribed, setIsSubscribed, subscription, setSubscription } =
    useStore(
      ({ isSubscribed, setIsSubscribed, subscription, setSubscription }) => ({
        isSubscribed,
        setIsSubscribed,
        subscription,
        setSubscription,
      })
    );

  const unsubscribeButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (!subscription) {
      console.error("Web push not subscribed");
      return;
    }
    event.preventDefault();
    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on the server
    setSubscription(null);
    setIsSubscribed(false);
    alert("Web push unsubscribed!");
  };

  //   if (!isSubscribed) return null;

  return (
    <button
      type="button"
      onClick={unsubscribeButtonOnClick}
      disabled={!isSubscribed}
    >
      Unsubscribe
    </button>
  );
};

export default Unsubscribe;
