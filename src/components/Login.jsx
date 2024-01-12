import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {toast} from 'react-toastify';
export default function Login() {
    const [password, setPassword ] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    
    const handleLogin = async () => {
    
        try {
        await signInWithEmailAndPassword(auth,email,password)
        navigate('/');
            
        } catch (error) {
            toast(error.code, {type:"error"})
            console.log(error);
            alert("wrong password");
        }
    }
  return (
    <div className='border p-3 bg-light mx-auto' style={{marginTop:70,maxWidth:400}}>
        <h1>Login</h1>
        <div className='form-group'>
            <label>Email</label>
            <input type='email' className='form-control' placeholder='Enter your email ' onChange={(e)=> setEmail(e.target.value)}/> 
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Enter a password ' onChange={(e)=> setPassword(e.target.value)}/> 
        </div>
        <br/>
        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
      
    </div>
  )
}
