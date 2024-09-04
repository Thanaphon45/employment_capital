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
    } catch (error) {
      console.log(error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navber />
      <div className="flex flex-1 justify-center items-center bg-gray-100 py-12">
        <form
          onSubmit={handlerSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <h3 className="text-2xl font-semibold mb-6 text-center">
            หน้าเข้าสู่ระบบ
          </h3>
          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            เข้าสู่ระบบ
          </button>
          <div className="text-center pb-6">
        <p className="text-gray-600">
          ยังไม่มีบัญชีใช่ไหม?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            สมัครสมาชิก!!
          </Link>
        </p>
      </div>
      </form>
      </div>
      <Foter />
    </div>
  );
}

export default LoginPage;
