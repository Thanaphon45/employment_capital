import { NextResponse } from "next/server";
import promisePool from "../../../../../lib/db";

// GET request to fetch organization details
export async function GET(req, { params }) {
  try {
    const organization_id = params.id; // Ensure this matches the URL parameter

    console.log(params);
    if (!organization_id) {
      return NextResponse.json(
        { message: "Organization ID is required" },
        { status: 400 }
      );
    }

    // Query to fetch the specified columns only
    const [rows] = await promisePool.query(
      "SELECT organization_id, organization_name, contactPhone, contactEmail FROM organization WHERE organization_id = ?",
      [organization_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// PUT request to update organization details
export async function PUT(req, { params }) {
  const organization_id = params.id;
  console.log(organization_id);

  try {
    // Extract only the relevant fields from the request body
    const {
      organization_name,
      contactPhone,
      contactEmail,
    } = await req.json();

    const connection = await promisePool;

    // Update only the specified fields
    const [result] = await connection.query(
      "UPDATE organization SET organization_name = ?, contactPhone = ?, contactEmail = ? WHERE organization_id = ?",
      [organization_name, contactPhone, contactEmail, organization_id]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: "Organization not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Organization updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating organization data:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      { status: 500 }
    );
  }
}
