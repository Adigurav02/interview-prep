import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { sendFriendChallengeInvite } from "@/lib/actions/general.action";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { toEmail, challengeId } = await request.json();
    if (!toEmail || !challengeId) return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    const result = await sendFriendChallengeInvite({ fromUserId: user.id, toEmail, challengeId });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}


