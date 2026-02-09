"use server";

import { connectDB } from "@/config/database";
import User from "@/models/User";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache"; // <--- ADD THIS IMPORT

async function markMessageAsRead(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }

  // verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to mark this message as read");
  }

  message.read = !message.read;

  await message.save();

  // Update the UI cache so the badge updates immediately
  revalidatePath("/messages", "page");

  return message.read;
}

export default markMessageAsRead;
