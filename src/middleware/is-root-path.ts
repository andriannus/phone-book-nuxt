import { Context } from "@nuxt/types";

export default function isRootPath({ redirect, route }: Context): void {
  if (route.path === "/") {
    return redirect("/landing");
  }
}
