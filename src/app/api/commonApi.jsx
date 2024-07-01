import db from '../config/db';
import { NextResponse } from "next/server";

export async function getUserData() {
  'use server';
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM user', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
    return results;

  } catch (error) {
    console.error('getUserData error', error);
    return NextResponse.error(error);
  }
}