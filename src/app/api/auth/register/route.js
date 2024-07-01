import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, password } = await request.json();

    console.log({ id, password });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}