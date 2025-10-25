"use client"
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, {useState} from 'react'

function register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSumbit = async(e: React.FormEvent<HTMLFormElement> ) =>{
        e.preventDefault();

        if( password!  ==  confirmPassword){
            alert("Passwords do not match")
            return;
        }

        try {
           const res  = await fetch("api/auth/register", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),

        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || "Registration  failed");

        }

        console.log(data);
        router.push("/login");

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSumbit}>

        <input type="email"
         placeholder="Email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)}/>

        <input type="password"
         placeholder="Password" 
         value={password} 
         onChange={(e) => setPassword(e.target.value)}/>

        <input type="password"
         placeholder="Confirm Password" 
         value={confirmPassword} 
         onChange={(e) => setConfirmPassword(e.target.value)}/>

         <button type="submit">Register</button>

      </form>

    <div>
       Already have an account? 
        <button onClick={() => router.push("/login")}> login</button>
        
    </div>


    </div>
  )
}

export default register
