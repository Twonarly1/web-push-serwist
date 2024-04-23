"use client";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
import { Notification, Subscribe, Unsubscribe } from "./components";
// import { cookies } from "next/headers";

// import type { Metadata } from "next";
// import { revalidatePath } from "next/cache";

// export const metadata: Metadata = {
//   title: "Home",
// };

const HomePage = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    let isInstalled = localStorage.getItem("pwaInstalled") === "1" || false;

    if (window.matchMedia("(display-mode: standalone)").matches) {
      // User is currently navigating on the PWA so yes it's installed
      localStorage.setItem("pwaInstalled", "1");
      isInstalled = true;
    } else {
      //User is navigating in browser
      window.addEventListener("beforeinstallprompt", () => {
        localStorage.setItem("pwaInstalled", "0");
        isInstalled = false;
        //User can get an installation prompt meaning the app is not installed
      });
      window.addEventListener("onappinstalled", () => {
        localStorage.setItem("pwaInstalled", "1");
        isInstalled = true;
      });
    }
    if (!isInstalled) {
      router.push("/install");
    }
  }

  return (
    <>
      <h1>Next.js + Serwist</h1>
      <Subscribe />
      <Unsubscribe />
      <Notification />
    </>
  );
};

export default HomePage;

// const base64ToUint8Array = (base64: string) => {
//   const padding = "=".repeat((4 - (base64.length % 4)) % 4);
//   const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

//   const rawData = window.atob(b64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// };

// const notificationsSupported = () =>
// typeof window !== "undefined" &&
// "Notification" in window &&
// "serviceWorker" in navigator &&
// "PushManager" in window &&
// window.serwist !== undefined;

// const [permission, setPermission] = useState(
//   window?.Notification?.permission || "default"
// );
// const [subscription, setSubscription] = useState<PushSubscription | null>(
//   null
// );
// const [registration, setRegistration] =
//   useState<ServiceWorkerRegistration | null>(null);

// const requestPermission = async () => {
//   if (!notificationsSupported()) {
//     return;
//   }

//   const receivedPermission = await window?.Notification.requestPermission();
//   setPermission(receivedPermission);
// };

// console.log("subscription", subscription);
// console.log("registration", registration);

// useEffect(() => {
//   if (!notificationsSupported()) {
//     return;
//   }

//   const registerPushSubscription = async () => {
//     void navigator.serviceWorker.ready.then((reg) => {
//       void reg.pushManager.getSubscription().then((sub) => {
//         if (
//           sub &&
//           !(
//             sub.expirationTime &&
//             Date.now() > sub.expirationTime - 5 * 60 * 1000
//           )
//         ) {
//         }
//       });
//       setRegistration(reg);
//     });
//   };

//   registerPushSubscription();
// }, []);

// useEffect(() => {
//   if (!registration) return;
//   if (permission !== "granted") {
//     alert("Please allow notifications first for our full experience!");
//   }

//   const subscribeToNotification = async () => {
//     await requestPermission();
//     const sub = await registration?.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: base64ToUint8Array(
//         process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!
//       ),
//     });
//     // setSubscription(sub);
//      // save subscription data on server
//     //  updateUser({
//     //   clerkId: clerkUser!.id,
//     //   data: { pushSubscription: { set: JSON.stringify(sub) } },
//     // });
//   };
//   subscribeToNotification();
// }, [registration, permission]);

// ________________________________________ //
// let pwaInstalled = cookies().get("pwaInstalled");
//   // This is all so facked.
//   let isInstalled = pwaInstalled?.value === "1" || false;

//   // let isInstalled = localStorage.getItem("pwaInstalled") === "1" || false;

//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     // User is currently navigating on the PWA so yes it's installed
//     cookies().set("pwaInstalled", "1");
//     isInstalled = true;
//   } else {
//     //User is navigating in browser
//     window.addEventListener("beforeinstallprompt", () => {
//       cookies().set("pwaInstalled", "0");
//       isInstalled = false;
//       //User can get an installation prompt meaning the app is not installed
//     });
//     window.addEventListener("onappinstalled", () => {
//       cookies().set("pwaInstalled", "1");
//       isInstalled = true;
//     });
//   }

//   if (!isInstalled) {
//     redirect("/install");
//   }
