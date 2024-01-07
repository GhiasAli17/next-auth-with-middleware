import { signOut } from "@/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
   
    await signOut()
    await cookies().delete('authjs.session-token')
    await cookies().delete('jwt')
    console.log("called api")
    return redirect("/login")

    


   // return Response.json({status:201})
  
}