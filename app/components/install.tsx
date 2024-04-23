// "use client";

// import { useState, useEffect } from "react";
// import useStore from "../store";
// import { useRouter } from "next/navigation";

// interface BeforeInstallPromptEvent extends Event {
//   readonly platforms: Array<string>;
//   readonly userChoice: Promise<{
//     outcome: "accepted" | "dismissed";
//     platform: string;
//   }>;
//   prompt(): Promise<void>;
// }

// const Install = () => {
//   const router = useRouter();
//   const { installed, installPrompt, setInstallPrompt } = useStore(
//     ({ installed, installPrompt, setInstallPrompt }) => ({
//       installed,
//       installPrompt,
//       setInstallPrompt,
//     })
//   );

//   console.log("installed", installed);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event: Event) => {
//       event.preventDefault();
//       setInstallPrompt(event);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   useEffect(() => {
//     if (!installed && installPrompt) {
//       router.push("/install");
//     }
//   }, [installed, installPrompt]);

//   if (installed) return null;

//   return null;
// };

// export default Install;

"use client";

import { useState, useEffect } from "react";
import useStore from "../store";

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
