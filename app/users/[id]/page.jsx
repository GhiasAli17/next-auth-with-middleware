import React from 'react'

export async function generateStaticParams() {
    const users = await fetch('https://657ab6c31acd268f9afbae6a.mockapi.io/users',{cache:'no-store'}).then(res=>res.json())
   
    return users.map((user) => ({
      id: user.id+"",
    }))
  }
   

const page = ({params}) => {
    const {id} = params
  return (
    <div>Users Id: {id}</div>
  )
}

export default page