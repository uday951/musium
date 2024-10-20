import React from 'react';
import DBConnection from './utils/config/db';
import { redirect } from 'next/navigation';
import UserNavigation from './components/UserNavigation';
import AdminPage from './admin/page';
import ProductCollection from './components/ProductCollection';
import { getServerSession } from 'next-auth/next';  // Correct import
import { authOptions } from './auth';  // Your auth options

const HomePage = async () => {

  const session = await getServerSession(authOptions);  // Correct function for App Router

  await DBConnection();

  if (!session) {
    redirect("/login");
  }

  console.log("role check:", session.user?.role);
  console.log("username check:", session.user?.name);

  const userName = session.user?.name;

  return (
    <div>
      {session.role === 'user' && (
        <>
          <UserNavigation userName={userName} />
          <img src='banner.jpg' alt='banner' className='bannerImage' />
          <ProductCollection />
        </>
      )}
      {session.role === 'admin' && <AdminPage />}
    </div>
  );
}

export default HomePage;
