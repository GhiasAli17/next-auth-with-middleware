
import axios from 'axios'
import Link from 'next/link'
import { signOut } from '@/auth';

 async function getData() {

  const res = await fetch('http://13.40.2.20:3000/superadmin/business',{cache:'no-store'})
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
  // const [user, setUsers] = useState([])
  // useEffect(()=>{
  //      axios.get('http://13.40.2.20:3000/superadmin/business').then(res=>{
  //       setUsers(res.data)
  //      })
  // },)
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
            users && users.lenght && users?.map((user,ind) => <li key={ind}>
              <Link href={`/users/${user.id}`}>
              {user.businessName}
              </Link></li>)
              
           }
           <li>abc</li>
        </ol>
    </div>
  )
}

export default UsersPage