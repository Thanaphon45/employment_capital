"use client";
import React, { useState } from "react";
import Navber from "../components/Navber";
import Foter from "../components/Foter";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  // ตรวจสอบ session และกำหนดเส้นทางตาม role ของผู้ใช้
  if (session) {
    if (session.user.role === "admin") {
      router.replace("/homeAdmin");
    } else if (session.user.role === "student") {
      router.replace("/welcome");
    }
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("ข้อมูลไม่ถูกต้อง! กรุณากรอกข้อมูลใหม่อีกครั้ง");
        return;
      }

      // กำหนดเส้นทางเพิ่มเติมตาม role ผู้ใช้ได้ตามต้องการ
      if (res.ok) {
        if (session.user.role === "admin") {
          router.replace("/homeAdmin");
        } else if (session.user.role === "student") {
          router.replace("/welcome");
        }
      }
    } catch (error) {
      console.log(error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#DCF2F1] via-[#7FC7D9] via-[#365486] to-[#0F1035]">
      <Navber />
      <div className="flex flex-1 justify-center items-center py-12 bg-opacity-60">
        <form
          onSubmit={handlerSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 w-full max-w-md"
        >
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <h3 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            หน้าเข้าสู่ระบบ
          </h3>
          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#365486] focus:ring-2 focus:ring-[#7FC7D9] transition duration-300"
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#365486] focus:ring-2 focus:ring-[#7FC7D9] transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#365486] to-[#0F1035] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#7FC7D9]"
          >
            เข้าสู่ระบบ
          </button>
          <div className="text-center pt-6">
            <p className="text-gray-600">
              ยังไม่มีบัญชีใช่ไหม?{' '}
              <Link href="/register" className="text-[#365486] hover:underline">
                สมัครสมาชิก!!
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Foter />
    </div>
  );
};

export default LoginPage;