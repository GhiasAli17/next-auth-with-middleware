
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers'
 
async function getUser(email,password){
  try {
    const user =  await fetch('http://13.40.2.20:3000/auth/login', {
        method: "POST",
        body: JSON.stringify({
           email,
           password,
           role:"SUPERADMIN"
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
  
    return user.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
// async function getUser(email){
//     try {
//       return {user:'ghias'};
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//       throw new Error('Failed to fetch user.');
//     }
//   }
   
 
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
        //   const parsedCredentials = z
        //     .object({ email: z.string(), password: z.string()})
        //     .safeParse(credentials);
        //     if (parsedCredentials.success) {
            //   const { email, password } = parsedCredentials.data;
            
              const { email, password } = credentials;
              const user = await getUser(email,password);
              const cookieStore = cookies()

              
      
             
             if(user.jwt){
              cookieStore.set("jwt",'Bearer '+user.jwt)
            return user;
             }
            
            // }
  
            console.log('Invalid credentials');
            return null;
        },
      }),
  ],
});