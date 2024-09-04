"use client";
import React, { useEffect, useState } from "react";
import Navber from "@/app/components/Navber";
import Foter from "../components/Foter";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Showorganization() {
  const [organization, setOrganization] = useState([]);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();

  const router = useRouter();

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "yyyy-MM-dd"
  };
  
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await fetch('/api/organization',{
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched data:", data);

          // const formattedData = data.map(organization => ({
          //   ...organization,
          //   application_start_date: formatDateToYYYYMMDD(organization.application_start_date),
          //   application_end_date: formatDateToYYYYMMDD(organization.application_end_date),
          // }));
          // setOrganization(formattedData);
        } else {
          setError('Failed to fetch organization data');
        }
      } catch (error) {
        setError('An error occurred while fetching organization data');
      }
    };

    fetchOrganization();
  }, []);

  const handleUpdate = (organization_id) => {
    router.push(`/organization/edit/${organization_id}`);
  };

  const handleDelete = async (organization_id) => {
    const confirmed = confirm("ต้องการลบหน่วยงานนี้ใช่หรือไม่?");
    if (confirmed) {
      const res = await fetch(
        `http://localhost:3000/api/organization/?organization_id=${organization_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Navber />
      <div className="แถบสี"></div>
      <br></br>
      <br></br>
      <div className="relative pys-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transform scale-110"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Organization List
          </h3>
          <a href='/organization/create' className="bg-blue-500 text-white px-3 py-2 rounded-lg no-underline mb-4 block text-center hover:bg-blue-600">
            เพิ่มหน่วยงาน
          </a>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-400 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-400">
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    ชื่อหน่วยงานที่ต้องการ
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    วันเริ่มต้นปฏิบัติงาน
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    วันสิ้นสุดปฏิบัติงาน
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    เวลาที่ปฏิบัติงาน
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    จำนวนที่รับ
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    ทักษะ
                  </th>
                  <th className="text-left py-2 px-4 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {organization.map(org => (
                  <tr
                    key={org.organization_id}
                    className="border-b border-gray-400 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 whitespace-nowrap text-center">
                      {org.organization_name}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap text-center">
                      {org.application_start_date}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap text-center">
                      {org.application_end_date}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      {org.working_time}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      {org.positions_available}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      {org.skills_required}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleUpdate(org.organization_id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(org.organization_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Foter />
    </>
  );
}

export default Showorganization;
