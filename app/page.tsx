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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        zoomAndPan="magnify"
        viewBox="0 0 375 374.999991"
        height="500"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <rect
          x="-37.5"
          width="450"
          y="-37.499999"
          height="449.999989"
          fill-opacity="1"
          fill="transparent"
        />
        <rect
          x="-37.5"
          width="450"
          // fill="hsl(259,38%,29%)"
          fill="#000000"
          y="-37.499999"
          height="449.999989"
          fill-opacity="1"
        />
        <path
          fill="#ffffff"
          d="M -135.503906 191.6875 L -135.503906 515.503906 L 505.929688 515.503906 L 505.929688 -132.128906 L -135.503906 -132.128906 Z M 259.453125 63.351562 C 294.496094 78.800781 331.910156 112.667969 343.195312 139.402344 C 360.417969 179.210938 349.136719 242.191406 324.191406 242.191406 C 314.09375 242.191406 313.5 235.0625 322.410156 226.152344 C 327.160156 221.398438 324.191406 218.425781 311.71875 216.050781 C 292.714844 211.890625 274.894531 217.238281 247.574219 235.65625 C 225.007812 251.105469 212.535156 251.105469 197.6875 235.65625 C 189.964844 227.339844 181.054688 224.367188 169.773438 225.554688 C 147.203125 227.933594 143.640625 249.917969 162.050781 269.523438 L 175.117188 283.785156 L 153.140625 283.785156 C 127.007812 283.785156 102.066406 262.394531 102.066406 239.816406 C 102.066406 226.152344 100.285156 224.960938 84.839844 227.933594 C 42.671875 236.25 11.789062 195.253906 24.855469 147.722656 C 46.832031 65.132812 166.800781 22.355469 259.453125 63.351562 Z M 298.058594 238.628906 C 298.058594 242.785156 292.714844 248.132812 286.773438 249.917969 C 280.835938 251.105469 270.738281 259.421875 265.394531 268.335938 C 252.328125 287.941406 257.671875 311.710938 277.269531 320.621094 C 285.585938 324.1875 292.117188 329.535156 292.117188 332.503906 C 292.117188 339.039062 276.082031 338.445312 262.421875 331.316406 C 251.140625 325.375 236.882812 291.507812 242.230469 283.191406 C 244.011719 280.21875 234.507812 277.84375 222.035156 277.84375 C 207.78125 277.84375 192.933594 273.089844 184.621094 266.554688 C 165.019531 251.105469 174.523438 244.570312 199.46875 256.453125 C 222.035156 267.148438 239.855469 263.582031 267.175781 242.191406 C 284.398438 228.527344 298.058594 226.746094 298.058594 238.628906 Z M 339.632812 271.304688 C 339.632812 282 307.5625 302.203125 292.714844 300.421875 C 271.332031 298.042969 269.550781 283.785156 290.929688 283.785156 C 300.433594 283.785156 311.71875 279.625 315.875 274.871094 C 324.191406 264.769531 339.632812 262.988281 339.632812 271.304688 Z M 339.632812 271.304688 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
        <path
          fill="#ffffff"
          d="M 118.695312 73.453125 C 68.804688 94.246094 86.625 147.128906 144.234375 147.128906 C 162.050781 147.128906 163.238281 145.9375 157.894531 126.332031 C 155.519531 116.230469 150.765625 114.449219 134.136719 116.230469 C 118.101562 118.011719 113.945312 116.824219 113.945312 108.507812 C 113.945312 103.160156 117.507812 99.59375 121.664062 101.378906 C 125.226562 102.566406 137.699219 100.1875 148.984375 96.03125 C 174.523438 85.335938 173.335938 84.742188 173.335938 107.914062 C 173.335938 132.867188 178.679688 147.128906 187.589844 147.128906 C 191.746094 147.128906 193.527344 137.621094 192.339844 120.390625 C 190.558594 102.566406 192.933594 88.304688 199.46875 78.800781 L 208.96875 63.945312 L 175.117188 64.539062 C 156.113281 64.539062 130.574219 68.699219 118.695312 73.453125 Z M 118.695312 73.453125 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
        <path
          fill="#ffffff"
          d="M 212.535156 88.898438 C 200.65625 105.535156 200.65625 119.203125 211.941406 140.589844 C 224.414062 165.546875 243.417969 171.488281 258.859375 155.445312 C 265.394531 149.503906 267.175781 141.1875 264.796875 131.085938 C 261.828125 119.796875 263.015625 116.824219 268.957031 118.609375 C 281.429688 122.765625 282.617188 152.476562 270.738281 165.546875 C 258.265625 179.210938 235.695312 179.804688 207.1875 167.921875 C 194.714844 163.167969 167.394531 159.011719 144.234375 159.011719 C 121.664062 159.011719 100.878906 156.632812 99.09375 153.070312 C 96.71875 149.503906 91.375 150.097656 84.246094 154.257812 C 70.585938 163.167969 62.273438 156.632812 71.773438 144.75 C 75.933594 139.996094 77.121094 129.898438 74.746094 119.796875 L 70.585938 103.753906 L 56.332031 119.796875 C 29.605469 151.285156 45.644531 189.3125 81.871094 180.398438 C 91.96875 177.429688 96.125 179.210938 96.125 185.746094 C 96.125 197.035156 54.550781 198.226562 43.265625 186.9375 C 37.328125 180.996094 36.734375 182.183594 40.296875 190.5 C 49.800781 216.050781 84.839844 219.019531 117.507812 197.035156 C 146.609375 176.835938 182.839844 172.082031 207.78125 185.152344 C 218.472656 190.5 226.789062 198.820312 226.789062 203.574219 C 226.789062 214.863281 225.601562 214.863281 200.0625 200.007812 C 175.710938 185.746094 154.328125 188.125 133.542969 207.730469 C 118.695312 221.992188 115.726562 248.726562 127.605469 259.421875 C 134.136719 264.175781 135.324219 262.394531 133.542969 249.324219 C 130.574219 229.714844 150.171875 206.542969 169.773438 206.542969 C 177.492188 206.542969 190.558594 211.890625 198.875 218.425781 C 217.878906 233.28125 223.820312 233.28125 246.386719 216.644531 C 261.234375 206.542969 273.113281 203.574219 303.402344 203.574219 L 340.820312 203.574219 L 337.257812 177.429688 C 330.128906 124.550781 283.804688 78.800781 251.734375 93.058594 C 239.261719 99 237.480469 102.566406 240.449219 120.390625 C 242.824219 135.246094 241.636719 141.1875 235.695312 141.1875 C 217.285156 141.1875 216.097656 104.347656 233.914062 87.710938 L 246.980469 75.828125 L 233.914062 75.828125 C 227.382812 75.828125 217.285156 81.769531 212.535156 88.898438 Z M 314.6875 142.375 C 317.65625 156.632812 305.183594 182.777344 295.089844 182.777344 C 284.992188 182.777344 283.210938 173.269531 292.117188 167.921875 C 295.683594 166.140625 298.058594 156.039062 298.058594 146.535156 C 298.058594 127.519531 311.125 124.550781 314.6875 142.375 Z M 314.6875 142.375 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
      </svg>
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
