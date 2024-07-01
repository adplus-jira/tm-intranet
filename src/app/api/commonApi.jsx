'use server';

import db from '../config/db';
import { NextResponse } from "next/server";

export async function getUserData() {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM user', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
        console.log('getUserData results', results);
      });
    });
    return results;

  } catch (error) {
    console.error('getUserData error', error);
    return NextResponse.error(error);
  }
}

export const execQuery = async (query) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
        console.log('execQuery results', results);
      });
    });
    return results;

  } catch (error) {
    console.error('execQuery error', error);
    return NextResponse.error(error);
  }
}