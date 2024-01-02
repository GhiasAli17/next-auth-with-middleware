'use server'
// without using above use server , got this error Error: Invariant: headers() expects to have requestAsyncStorage, none available.
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
export async function authenticate(
    prevState,
    formData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
        console.log("Abc",error.type)
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