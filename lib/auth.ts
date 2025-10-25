import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "jsmith@123.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        try {
          await connectToDatabase();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.username });
          
          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email
          };
          
        } catch (error) {
          // Return null on error to indicate auth failed
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],


  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id;
      }
      return token;
    },

     async session({session, token}){
      if(session.user){
        session.user.id = token.id as string;
      }
      return session;
    },

  },


  pages:{
    signIn:"/login",
    error:"/login",
  },

  session:{
    strategy:"jwt",
    maxAge:30 * 24 * 60 * 60,
  },

  secret:process.env.NEXTAUTH_SECRET
};
