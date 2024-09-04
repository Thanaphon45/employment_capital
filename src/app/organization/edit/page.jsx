"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navber from "@/app/components/Navber";
import Foter from "@/app/components/Foter";

function EditorganizationPage({ params }) {
  const { id: organization_id } = params;
  const [postData, setPostData] = useState({});
  const router = useRouter();

  // Initialize state with empty strings
  const [newOrganizationName, setNewOrganizationName] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newOperationTime, setNewOperationTime] = useState("");
  const [newNumberOfVacancies, setNewNumberOfVacancies] = useState("");
  const [newContactPhoneNumber, setNewContactPhoneNumber] = useState("");
  const [newSkills, setNewSkills] = useState("");

  // Utility function to format the date to "yyyy-MM-dd"
  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "yyyy-MM-dd"
  };

  const getDataById = async (organization_id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/organization/${organization_id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      console.log(data, "data");
      setPostData(data);

      // Set state with data
      setNewOrganizationName(data.organization_name || "");
      setNewStartDate(formatDateToYYYYMMDD(data.application_start_date) || "");
      setNewEndDate(formatDateToYYYYMMDD(data.application_end_date) || "");
      setNewOperationTime(data.working_time || "");
      setNewNumberOfVacancies(data.positions_available || "");
      setNewContactPhoneNumber(data.contact_number || "");
      setNewSkills(data.skills_required || "");
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (organization_id) {
      getDataById(organization_id);
    }
  }, [organization_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/organization/${organization_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_name: newOrganizationName,
          application_start_date: newStartDate,
          application_end_date: newEndDate,
          working_time: newOperationTime,
          positions_available: newNumberOfVacancies,
          contact_number: newContactPhoneNumber,
          skills_required: newSkills,
        }),
      });

      if (!res.ok) {
        throw new Error("Fail to update");
      }

      router.refresh();
      router.push("/organization");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navber />
      <div className="แถบสี"></div>
      <br/><br/>
      <div className="relative pys-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transform scale-110"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h3 className="text-2xl font-bold mb-4 text-center">Edit Organization Page</h3>
          {organization_id && <div className="text-center mb-4">Editing Organization ID: {organization_id}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3>ชื่อหน่วยงานที่ต้องการ</h3>
            <input
              onChange={(e) => setNewOrganizationName(e.target.value)}
              type="text"
              placeholder="ชื่อหน่วยงานที่ต้องการ"
              value={newOrganizationName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>วันเริ่มต้นปฏิบัติงาน</h3>
            <input
              onChange={(e) => setNewStartDate(e.target.value)}
              type="date"
              placeholder="วันเริ่มต้นปฏิบัติงาน"
              value={newStartDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>วันสิ้นสุดปฏิบัติงาน</h3>
            <input
              onChange={(e) => setNewEndDate(e.target.value)}
              type="date"
              placeholder="วันสิ้นสุดปฏิบัติงาน"
              value={newEndDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>เวลาที่ปฏิบัติงาน</h3>
            <input
              onChange={(e) => setNewOperationTime(e.target.value)}
              type="text"
              placeholder="เวลาที่ปฏิบัติงาน"
              value={newOperationTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>จำนวนที่รับ</h3>
            <input
              onChange={(e) => setNewNumberOfVacancies(e.target.value)}
              type="number"
              placeholder="จำนวนที่รับ"
              value={newNumberOfVacancies}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>เบอร์โทรศัพท์ติดต่อหน่วยงาน</h3>
            <input
              onChange={(e) => setNewContactPhoneNumber(e.target.value)}
              type="text"
              placeholder="เบอร์โทรศัพท์ติดต่อหน่วยงาน"
              value={newContactPhoneNumber}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <h3>ทักษะ</h3>
            <input
              onChange={(e) => setNewSkills(e.target.value)}
              type="text"
              placeholder="ทักษะ"
              value={newSkills}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      </div>
      <br/><br/><Foter/>
    </>
  );
}

export default EditorganizationPage;
