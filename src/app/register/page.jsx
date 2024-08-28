"use client";
import React, { useState } from "react";
import Navber from "../components/Navber";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  // if (session) router.replace("/welcome");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
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
          const form = e.target;
          setError("");
          setSuccess("ลงทะเบียนผู้ใช้สำเร็จ!");
          form.reset();
        } else {
          console.log("การลงทะเบียนผู้ใช้ล้มเหลว");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div>
      <Navber />
      <div>
        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}
          {success && <div>{success}</div>}
          <h3>สมัครสมาชิก</h3>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            placeholder="กรอกอีเมล์ของคุณ"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="กรอกรหัสผ่านของคุณ"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="ยืนยันรหัสผ่านของคุณ"
          />
          <button type="submit">สมัครสมาชิก</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
