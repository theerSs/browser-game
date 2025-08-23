import type { UserWithId } from "../configs/auth";

import { auth } from "../configs/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  event.context.user = session?.user as unknown as UserWithId;
  const protectedPaths = ["/game", "/characters-list"];
  const isProtected = protectedPaths.some(path => event.path.startsWith(path));
  if (isProtected && !session?.user) {
    await sendRedirect(event, "/", 302);
  }
});
