import type { UserWithId } from "../configs/auth";

import { auth } from "../configs/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;
  if (event.path.startsWith("/game")) {
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
