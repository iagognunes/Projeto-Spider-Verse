import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.API_URL}/api/heroes`);
  const data = await response.json();

  return NextResponse.json({ data });
}
