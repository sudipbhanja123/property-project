"use server";
import cloudinary from "@/config/cloudinary";
import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    4;
    throw new Error("Unauthorized");
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== userId) {
    throw new Error("You do not have permission to delete this message");
  }
  await message.deleteOne();
  revalidatePath("/", "layout");
}
export default deleteMessage;
