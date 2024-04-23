"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const Install = () => {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setInstallPrompt(e);
  });

  // useEffect(() => {
  //   const handleBeforeInstallPrompt = (event: Event) => {
  //     event.preventDefault();
  //     setInstallPrompt(event);
  //   };

  //   window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  //   return () => {
  //     window.removeEventListener(
  //       "beforeinstallprompt",
  //       handleBeforeInstallPrompt
  //     );
  //   };
  // }, []);

  useEffect(() => {
    console.log("installPrompt", installPrompt);
  }, [installPrompt]);

  const handleInstallClick = () => {
    if (installPrompt) {
      const promptEvent = installPrompt as BeforeInstallPromptEvent;
      promptEvent.prompt();
      promptEvent.userChoice.then(({ outcome }) => {
        if (outcome === "accepted") {
          console.log("User accepted the install prompt");
          localStorage.setItem("pwaInstalled", "1");
          router.push("/");
        } else {
          console.log("User dismissed the install prompt");
          alert("You can install the app later from the browser menu");
        }
        setInstallPrompt(null);
      });
    }
  };

  // implement better UI
  return (
    <button id="install" hidden={!installPrompt} onClick={handleInstallClick}>
      Install App
    </button>
  );
};

export default Install;
