import { Install, Notification, Subscribe, Unsubscribe } from "./components";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = () => {
  return (
    <>
      <h1>Next.js + Serwist</h1>

      <Install />
      <Subscribe />
      <Unsubscribe />
      <Notification />
    </>
  );
};

export default HomePage;
