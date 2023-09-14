import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Waritsara Wongkham",
    studentId: "650610805",
  });
};
