import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { listIncomingInvites } from "@/lib/actions/general.action";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  const invites = await listIncomingInvites(user.email);
  return NextResponse.json({ success: true, invites });
}


