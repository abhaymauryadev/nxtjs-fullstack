"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function loginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSumbit = async(e: React.FormEvent<HTMLFormElement> ) =>{
        e.preventDefault();

        const result =  await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if(result?.error){
         alert(result.error || "Login successful");
        }else{
            router.push("/");
        }

    }

  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSumbit}>

        <input type="email"
         placeholder="Email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)}/>

        <input type="password"
         placeholder="Password" 
         value={password} 
         onChange={(e) => setPassword(e.target.value)}/>

         <button type="submit">Login</button>

      </form>

      <div>
        Don't have an account?
         <button onClick={() => router.push("/register")}>Register</button> 
    </div>
    </div>

  )
}

export default loginPage
