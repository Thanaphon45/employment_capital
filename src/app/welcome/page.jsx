"use client";
import React from 'react'
import Navber from '../components/Navber'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
// import { authOption } from '../api/auth/[...nextauth]/route';

function WelcomePage() {

  
  // const session = await getServerSession(authOptions);
  // const session = useSession();
  const { data: session, status } = useSession();

  console.log(session,"session2");
  
  if(!session) redirect("/login");

  // if (session.user.role === 'student') {
  //   redirect('/login');
  // } else if (session.user.role === 'admin') {
  //   redirect('/profile');
  // }

  

  return (
    <div>
        <Navber session = {session}/>
        <div>
            <h3>หน้าหลัก</h3>
            <p>Welcome, {session.user.name}!</p>
            <p>Role: {session.user.role}</p>
            <p>บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ</p>
            
        </div>
        </div>
  )
}

export default WelcomePage