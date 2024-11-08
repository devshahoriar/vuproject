/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";

export const GET = async (req:NextRequest)=>{
  return new Response("Hello World")
}