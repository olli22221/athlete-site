import { NextResponse } from "next/server";

// Ends an active Tavus conversation early so it stops burning minutes the
// moment a visitor closes the widget. Conversation ids are unguessable, which
// is what keeps this safe to call without a session of its own.
// Docs: https://docs.tavus.io/api-reference/conversations/end-conversation
export async function POST(request: Request) {
  const apiKey = process.env.TAVUS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const { conversationId } = await request.json().catch(() => ({}));
  if (typeof conversationId !== "string" || !conversationId) {
    return NextResponse.json({ error: "missing_conversation_id" }, { status: 400 });
  }

  try {
    await fetch(`https://tavusapi.com/v2/conversations/${encodeURIComponent(conversationId)}/end`, {
      method: "POST",
      headers: { "x-api-key": apiKey },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
