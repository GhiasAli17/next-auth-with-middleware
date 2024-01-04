
import { cookies } from 'next/headers';
import Link from 'next/link'
import { signOut } from '@/auth';

async function getData() {

  
  const res = await fetch('http://13.40.2.20:3000/superadmin/business',{cache:'no-store',headers:{
    'Authorization': cookies().get('jwt').value
  }})
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    //console.log("error",res)
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const UsersPage =  async () => {
  const users = await getData()
  return (
    <div>
         <form action={async () => {
            'use server';
            await signOut();
          }}>
          <button>
            <div>Sign Out</div>
          </button>
        </form>
        <ol>
           {
            users && users.length && users?.map((user,ind) => <li key={ind}>
              <Link href={`/users/${user.id}`}>
              {user.businessName}
              </Link></li>)
              
           }
          
        </ol>
    </div>
  )
}

export default UsersPage