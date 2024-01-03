import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.DOMAIN_ORIGIN;
  const response = await fetch(`${apiUrl}/api/heroes`, { cache: "no-store" });
  const data = await response.json();

  return NextResponse.json({ data });
}
