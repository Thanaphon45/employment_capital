import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
function Navber({ session }) {
    return (
        <nav>

            <div className="container mx-auto">
                <Link href="/home_admin">Home page</Link>
                <Link href="/edit_admin">เพิ่ม-แก้ไขข้อมูล</Link>
                <Link href="/matching_admin">ดูผลการจับคู่</Link>
                <Link href="/report_admin">ออกรายงาน</Link>
            </div>
            <div className="logothaksin">
                <Image src="/thaksin.png" width={80} height={80} alt="logothaksin" />
            </div>
            <div className="header">
                <div className="logo">
                    <Image src="/tsu.png" width={200} height={200} alt="logo" />
                </div>
            </div>
            <ul>
                {!session ? (
                    <Link href="/login">เข้าสู่ระบบ</Link>
                ) : (
                    <>
                        <a href='/welcome'>โปรไฟล์</a>
                        <a onClick={() => signOut()}>LogOut</a>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navber