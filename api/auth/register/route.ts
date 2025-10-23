import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password  is required"},
                {status:400}
                
            )
        }

         await connectToDatabase()

         const existingUser = await User.findOne({email})
         if(existingUser){
            return NextResponse.json(
                {error:"User is already register"},
                {status:400}
                
            ) 
         }

         User.create({
            email,
            password,
         })

         return NextResponse.json(
            {message:"Email and Password is register"},
            {status:400}
         );

        
    } catch (error) {
         console.error("Regsitration is Failed",error)
        return NextResponse.json(
            {message:"Failed to register User"},
            {status:400}
         );

    }
}
