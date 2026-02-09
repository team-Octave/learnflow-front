// app/api/track/route.ts
import { commonFetch } from '@/shared/api';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const raw = await req.text();

  let payload: any;
  try {
    payload = JSON.parse(raw);
    console.log(payload);
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  if (!payload?.event) return new NextResponse(null, { status: 204 });

  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    await commonFetch(`${BASE_URL}/api/v1/track`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (e) {}

  return new NextResponse(null, { status: 204 });
}
