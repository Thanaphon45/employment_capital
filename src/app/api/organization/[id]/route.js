import { NextResponse } from "next/server";
import promisePool from "../../../../../lib/db";

export async function GET(req, { params }) {
  try {
    const organization_id = params.id; // Ensure this matches the URL parameter

    console.log(params);
    if (!organization_id) {
      return NextResponse.json({ message: "Organization ID is required" },{ status: 400 });
    }
    const [rows] = await promisePool.query("SELECT * FROM organization WHERE organization_id = ?",[organization_id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Organization not found" },{ status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message },{ status: 500 });
  }
}
export async function PUT(req, { params }) {
  const organization_id = params.id;
  console.log(organization_id);
  const {
    neworganization_name: organization_name,
    newapplication_start_date: application_start_date,
    newapplication_end_date: application_end_date,
    newworking_time: working_time,
    newpositions_available: positions_available,
    newcontact_number: contact_number,
    newskills_required: skills_required,
  } = await req.json();
  // Connect to MySQL
  const connection = await promisePool;

  try {
    const [result] = await connection.query(
      "UPDATE organization SET organization_name = ?, application_start_date = ?, application_end_date = ?, application_time = ?, number_of_positions = ?, contact_phone_number = ?, skills = ? WHERE organization_id = ?",
      [
        organization_name,
        application_start_date,
        application_end_date,
        working_time,
        positions_available,
        contact_number,
        skills_required,
        organization_id,
      ]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ message: "Organization not found" }),{ status: 404 });}
    return new Response(JSON.stringify({ message: "Organization updated" }),{ status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }),{ status: 500 });
  }
}
