import { NextResponse } from "next/server";
import { kvIsDurable } from "@/lib/kv";
import { walletConfigured } from "@/lib/wallet";

// Tells the avatar page which parts of the flow are actually wired up, so it
// can show setup instructions instead of a button that will fail. Reports
// presence only — never the keys themselves.
export async function GET() {
  return NextResponse.json({
    avatarConfigured:
      Boolean(process.env.TAVUS_API_KEY && process.env.TAVUS_REPLICA_ID) &&
      walletConfigured(),
    paymentsConfigured:
      Boolean(process.env.STRIPE_SECRET_KEY) && kvIsDurable() && walletConfigured(),
    durableStore: kvIsDurable(),
  });
}
