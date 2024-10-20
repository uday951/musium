

import React from 'react'

import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNavbar from '../components/AdminNavbar'
import AddProduct from '../components/AddProduct'
import { authOptions } from '../auth'
import { getServerSession } from 'next-auth';


const AdminPage = async() => {


  const session = await getServerSession(authOptions);


  if(!session){
    redirect("/login")
  }



  return (
      <div>
        {session.role === 'admin' ? (
          <>
          <AdminNavbar />
          <AddProduct />

          </>
        ) : <div align="center">
          <h1>Not Authorized</h1>
          <Link href="/login"> Login</Link>
        </div>
      }
      </div>
   
  )
}

export default AdminPage