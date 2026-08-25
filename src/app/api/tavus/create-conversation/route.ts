import { NextResponse } from "next/server";

const TAVUS_API_URL = "https://tavusapi.com/v2/conversations";

// Creates a live Tavus Conversational Video Interface (CVI) session and
// hands the resulting `conversation_url` back to the browser to embed in an
// iframe. Requires TAVUS_API_KEY + TAVUS_REPLICA_ID (and optionally
// TAVUS_PERSONA_ID) to be set as server-side env vars — see .env.example.
//
// Docs: https://docs.tavus.io/api-reference/conversations/create-conversation
export async function POST() {
  const apiKey = process.env.TAVUS_API_KEY;
  const replicaId = process.env.TAVUS_REPLICA_ID;
  const personaId = process.env.TAVUS_PERSONA_ID;

  if (!apiKey || !replicaId) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Tavus isn't set up yet. Add TAVUS_API_KEY and TAVUS_REPLICA_ID to your environment (see .env.example) once you've created a replica at tavus.io.",
      },
      { status: 501 }
    );
  }

  try {
    const response = await fetch(TAVUS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        replica_id: replicaId,
        ...(personaId ? { persona_id: personaId } : {}),
        conversation_name: "Website visitor session",
        properties: {
          max_call_duration: 600, // 10 minutes per session
          enable_recording: false,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "tavus_error",
          message: data?.message || "Tavus rejected the request.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      conversationId: data.conversation_id,
      conversationUrl: data.conversation_url,
    });
  } catch {
    return NextResponse.json(
      {
        error: "network_error",
        message: "Couldn't reach Tavus. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
