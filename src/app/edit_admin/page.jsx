"use client";
import React from 'react'
import Navber from '../components/Navber'
import Foter from '../components/Foter';

function Page() {
  return (
    <div>
      <Navber />
      <div className="แถบสี"></div> 
      <div><br></br>
        <a href='/organization' className="bg-blue-500 text-white px-3 py-2 rounded-lg no-underline mb-4 block text-center hover:bg-blue-600">เพิ่มหน่วยงาน</a>
      </div><br></br><br></br><br></br>
      <Foter/>
    </div>
  )
}

export default Page;
