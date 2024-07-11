import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, password } = await request.json();
  return NextResponse.json({ message: "success" });
}