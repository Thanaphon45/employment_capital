
"use client";
import React from 'react'
import Navber from '../components/Navber'
import Foter from '../components/Foter';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
// import { authOption } from '../api/auth/[...nextauth]/route';

function ProfilePage() {

  
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
        <div className="แถบสี"></div> 
        <div>
        <div className="logohome">
                <Image src="/logohome.jpg" width={1000} height={100} alt="logohome" />
            </div>
      <h1 className="หน้าแรกแอดมิน">บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ</h1>
            <br />
            <p className="text-2xl font-bold mb-6 text-center">ยินดีตอนรับเข้าสู่ บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ <br></br> {session.user.name}!</p>
            <a href='/scholarships' className="bg-blue-500 text-white px-3 py-2 rounded-lg no-underline mb-4 block text-center hover:bg-blue-600">เพิ่มทุน</a>
        </div>
        <p>Role: {session.user.role}</p>
        <Foter/>
        </div>
  )
}

export default ProfilePage

