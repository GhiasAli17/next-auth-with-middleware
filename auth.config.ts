import { cookies } from 'next/headers';
import type { NextAuthConfig } from 'next-auth';
import { signOut } from 'next-auth/react';

 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      var isLoggedIn = !!auth?.user;
   
      const res = await fetch('http://13.40.2.20:3000/superadmin/business',{cache:'no-store',headers:{
        'Authorization': cookies().get('jwt')?.value || ''
      }})
     console.log("in Auth",res.status)
          if(res.status === 401){
              isLoggedIn = false
        }
        
      
      const isOnUsersPage = nextUrl.pathname.startsWith('/users');
      if (isOnUsersPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/users', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
