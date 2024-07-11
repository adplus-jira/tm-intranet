'use server';
import { NextResponse } from "next/server";
import { auth } from '@/auth';

const db = require('../config/db');

export const execQuery = async (query) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject("queryError!!!", error);
        }
        resolve(results);
        // console.log('execQuery results', results);
      });
    });
    
    return JSON.parse(JSON.stringify(results));

  } catch (error) {
    console.error('execQuery error', error);
    return NextResponse.error(error);
  }
}

export const getSessionData = async () => {
  const result = await auth();
  return result;
}