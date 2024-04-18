"use client";

import useStore from "@/store/store";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const Install = () => {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  console.log("HERE", installPrompt);

  const { setIsInstalled } = useStore(({ setIsInstalled }) => ({
    setIsInstalled,
  }));

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      const promptEvent = installPrompt as BeforeInstallPromptEvent;
      promptEvent.prompt();
      promptEvent.userChoice.then(({ outcome }) => {
        if (outcome === "accepted") {
          console.log("User accepted the install prompt");
          setIsInstalled(true);
        } else {
          console.log("User dismissed the install prompt");
          setIsInstalled(false);
        }
        setInstallPrompt(null);
      });
    }
  };

  return (
    <button id="install" hidden={!installPrompt} onClick={handleInstallClick}>
      Install App
    </button>
  );
};

export default Install;
