'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import { AuthError } from 'next-auth'

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/action';

export default function LoginPage() {

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} >
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
       
          <div>
          <div>
            <label
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <button>Log In</button>
        </div>
            {errorMessage && (
            <>
              
              <p className="alert">{errorMessage}</p>
            </>
          )}
        
    </div>
    </form>
  )
}
