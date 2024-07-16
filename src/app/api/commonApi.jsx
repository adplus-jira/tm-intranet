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
      });
    });
    
    return JSON.parse(JSON.stringify(results));

  } catch (error) {
    console.error('execQuery error', error);
    return NextResponse.error(error);
  }
}