"use server";

import { connectDB } from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId);

  // Check if property is in bookmarks
  let isBookmarked = user.bookmarks.includes(propertyId);

  // FIX: Return an object matching what the client expects
  return { isBookmarked };
}

export default checkBookmarkStatus;
