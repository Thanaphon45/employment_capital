"use client";
import React, { useState } from "react";
import Navber from "../components/Navber";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Foter from "../components/Foter";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  // ตรวจสอบ session เพื่อเปลี่ยนเส้นทาง
  if (session) {
    router.replace("/welcome");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูลก่อนส่ง
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน!");
      return;
    } else if (!username || !password || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (res.ok) {
          setError("");
          setSuccess("ลงทะเบียนผู้ใช้สำเร็จ!");
          e.target.reset(); // รีเซ็ตฟอร์มหลังจากลงทะเบียนสำเร็จ
        } else {
          setError("การลงทะเบียนผู้ใช้ล้มเหลว");
        }
      } catch (error) {
        console.log("error", error);
        setError("เกิดข้อผิดพลาดในการลงทะเบียน");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navber />
      <div className="flex flex-1 justify-center items-center bg-gray-100 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {success && (
            <div className="text-green-500 mb-4 text-center">{success}</div>
          )}
          <h3 className="text-2xl font-semibold mb-6 text-center">
            สมัครสมาชิก
          </h3>
          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              placeholder="กรอกอีเมล์ของคุณ"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="ยืนยันรหัสผ่านของคุณ"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
      <Foter />
    </div>
  );
}

export default RegisterPage;
