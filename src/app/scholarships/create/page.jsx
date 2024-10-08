"use client";
import React, { useState, useEffect } from 'react';
import Navber from '@/app/components/Navber';
import Foter from '@/app/components/Foter';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function ScholarshipsForm() {
  const [scholarship_id, setScholarshipID] = useState("");
  const [application_start_date, setApplicationStartDate] = useState("");
  const [application_end_date, setApplicationEndDate] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [academic_term, setAcademicTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session status is determined
    if (!session) router.push("/login"); // Redirect to login page if not authenticated
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!application_start_date || !application_end_date || !academic_year || !academic_term) {
      setError("Please complete all inputs!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scholarship_id,
          application_start_date,
          application_end_date,
          academic_year,
          academic_term,
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("เพิ่มทุนสำเร็จ");
        e.target.reset();
        router.push("/scholarships");
      } else {
        setError("เพิ่มทุนไม่สำเร็จ");
      }
    } catch (error) {
      setError("An error occurred during submission.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navber session={session} />
      <div className="แถบสี"></div>
      <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Register Scholarship</h3>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          
          <div>
            <h3 className="text-gray-700">ปีการศึกษา</h3>
            <input
              onChange={(e) => setAcademicYear(e.target.value)}
              type="number"
              placeholder="ปีการศึกษา"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-gray-700">เทอมการศึกษา</h3>
            <input
              onChange={(e) => setAcademicTerm(e.target.value)}
              type="number"
              placeholder="เทอมการศึกษา"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-gray-700">วันที่เริ่มต้น</h3>
            <input
              onChange={(e) => setApplicationStartDate(e.target.value)}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-gray-700">วันที่สิ้นสุด</h3>
            <input
              onChange={(e) => setApplicationEndDate(e.target.value)}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      <Foter/>
    </div>
  );
}

export default ScholarshipsForm;
