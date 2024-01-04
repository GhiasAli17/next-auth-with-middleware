'use server'
// without using above use server , got this error Error: Invariant: headers() expects to have requestAsyncStorage, none available.
 import { cookies } from 'next/headers';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
export async function authenticate(
    prevState,
    formData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function isAuthenticated(){
         console.log("cookie in server action",cookies().get("jwt"))
  }