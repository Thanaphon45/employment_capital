"use client";
import React, { useState } from "react";
import Navber from "@/app/components/Navber";
import { useRouter } from "next/navigation";

function OrganizationForm() {
  const [organization_name, setOrganizationName] = useState("");
  const [application_start_date, setApplicationStartDate] = useState("");
  const [application_end_date, setApplicationEndDate] = useState("");
  const [working_time, setWorkingTime] = useState("");
  const [positions_available, setPositionsAvailable] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [skills_required, setSkillsRequired] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organization_name || !application_start_date || !application_end_date || !working_time || !positions_available || !contact_number || !skills_required) {
      setError("Please complete all inputs!");
      return;
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/organization", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization_name,
            application_start_date,
            application_end_date,
            working_time,
            positions_available,
            contact_number,
            skills_required,
          }),
        });

        if (res.ok) {
          const form = e.target;
          setError("");
          setSuccess("เพิ่มหน่วยงานสำเร็จ");
          form.reset();
          router.refresh();
          router.push("/organization");
        } else {
          console.log("เพิ่มหน่วยงานไม่สำเร็จ");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div>
      <Navber />
      <div className="แถบสี"></div>
      <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Register Organization
          </h3>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          
          <div>
            <h3>ชื่อหน่วยงานที่ต้องการ</h3>
            <input
              onChange={(e) => setOrganizationName(e.target.value)}
              type="text"
              placeholder="ชื่อหน่วยงานที่ต้องการ"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>วันเริ่มต้นปฏิบัติงาน</h3>
            <input
              onChange={(e) => setApplicationStartDate(e.target.value)}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>วันสิ้นสุดปฏิบัติงาน</h3>
            <input
              onChange={(e) => setApplicationEndDate(e.target.value)}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>เวลาที่ปฏิบัติงาน</h3>
            <input
              onChange={(e) => setWorkingTime(e.target.value)}
              type="text"
              placeholder="เวลาที่ปฏิบัติงาน"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>จำนวนที่รับ</h3>
            <input
              onChange={(e) => setPositionsAvailable(e.target.value)}
              type="number"
              placeholder="จำนวนที่รับ"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>เบอร์โทรศัพท์ติดต่อหน่วยงาน</h3>
            <input
              onChange={(e) => setContactNumber(e.target.value)}
              type="text"
              placeholder="เบอร์โทรศัพท์ติดต่อหน่วยงาน"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3>ทักษะที่ต้องการ</h3>
            <input
              onChange={(e) => setSkillsRequired(e.target.value)}
              type="text"
              placeholder="ทักษะ"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationForm;
