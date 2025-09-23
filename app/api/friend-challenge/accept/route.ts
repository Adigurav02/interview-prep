import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { acceptInvite } from "@/lib/actions/general.action";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  const { inviteId } = await request.json();
  if (!inviteId) return NextResponse.json({ success: false, message: 'Missing inviteId' }, { status: 400 });
  const result = await acceptInvite(inviteId, user.id);
  return NextResponse.json(result);
}


