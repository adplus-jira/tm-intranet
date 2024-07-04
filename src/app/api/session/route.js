import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await auth();
  console.log(result);
  return NextResponse.json(result);
}