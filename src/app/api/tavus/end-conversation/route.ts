import { NextRequest, NextResponse } from "next/server";

// Ends an active Tavus conversation early so it doesn't keep burning
// minutes after a visitor closes the widget.
// Docs: https://docs.tavus.io/api-reference/conversations/end-conversation
export async function POST(req: NextRequest) {
  const apiKey = process.env.TAVUS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const { conversationId } = await req.json().catch(() => ({}));
  if (!conversationId) {
    return NextResponse.json({ error: "missing_conversation_id" }, { status: 400 });
  }

  try {
    await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: "POST",
        headers: { "x-api-key": apiKey },
      }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
