"use server";

import { cookies } from "next/headers";

const addCookies = () => {
  cookies().set("pwaInstalled", "1");
};

const removeCookies = () => {
  cookies().set("pwaInstalled", "0");
};

export { addCookies, removeCookies };
