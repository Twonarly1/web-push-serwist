import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface TimerStoreState {
  installPrompt: Event | null;
  setInstallPrompt: (installPrompt: Event | null) => void;
  installed: boolean;
  setIsInstalled: (installed: boolean) => void;
  isSubscribed: boolean;
  setIsSubscribed: (isSubscribed: boolean) => void;
  subscription: PushSubscription | null;
  setSubscription: (subscription: PushSubscription | null) => void;
  registration: ServiceWorkerRegistration | null;
  setRegistration: (registration: ServiceWorkerRegistration | null) => void;
}

const useStore = createWithEqualityFn<TimerStoreState>()(
  (set) => ({
    installPrompt: null,
    setInstallPrompt: (installPrompt) => set({ installPrompt }),
    installed: false,
    setIsInstalled: (installed) => set({ installed }),
    isSubscribed: false,
    setIsSubscribed: (isSubscribed) => set({ isSubscribed }),
    subscription: null,
    setSubscription: (subscription) => set({ subscription }),
    registration: null,
    setRegistration: (registration) => set({ registration }),
  }),
  shallow
);

export default useStore;
