import { NextResponse } from "next/server";

// Lightweight check the frontend uses to decide whether to show the
// "Start Conversation" button or the setup instructions. Never leaks the
// key itself — only whether it's present.
export async function GET() {
  const configured = Boolean(
    process.env.TAVUS_API_KEY && process.env.TAVUS_REPLICA_ID
  );

  return NextResponse.json({ configured });
}
