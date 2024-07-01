'use server';
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function handleLogout () {
  await signOut({ redirect: false }).then(() => redirect('/login'));
}

export async function getSession () {
  const result = await auth();
  return result;
}