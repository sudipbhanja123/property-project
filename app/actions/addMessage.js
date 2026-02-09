"use server";
import { connectDB } from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message"; // Ensure you import your Message model

// 1. Update the function signature to accept (previousState, formData)
async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  console.log(sessionUser);

  if (!sessionUser || !sessionUser.userId) {
    // 2. Return an object with 'error' key instead of throwing error directly
    // This allows the UI to display the error message gracefully
    return { error: "You must be logged in to add a property." };
  }

  const { userId } = sessionUser;

  // Now formData is the second argument, so this works:
  const recipient = formData.get("recipient");

  if (userId === recipient) {
    return { error: "You cannot send a message to yourself." };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
