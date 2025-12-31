import { connectDB } from "@/config/database";
import GoogleProvider from "next-auth/providers/google";

import { signIn } from "next-auth/react";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",

          access_type: "offline",

          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // Invoked on successful sign in

    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. If not, create a new user
      if (!userExists) {
        // Truncate username if it's too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    // session callback function that modifies the session object

    async session({ session }) {
      // 1. get user from database
      const dbUser = await User.findOne({ email: session.user.email });
      // 2. assign user id from the session
      session.user.id = dbUser._id.toString();
      // 3. return the session
      return session;
    },
  },
};
