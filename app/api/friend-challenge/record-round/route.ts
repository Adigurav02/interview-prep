import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { recordRound } from "@/lib/actions/general.action";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const { gameId, roundNumber, opponentId, challengeId, userScore, opponentScore } = body || {};
  if (!gameId || !roundNumber || !opponentId || !challengeId || userScore == null || opponentScore == null) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
  }
  const result = await recordRound({
    gameId,
    roundNumber,
    challengerId: user.id,
    opponentId,
    challengeId,
    challengerScore: Number(userScore),
    opponentScore: Number(opponentScore),
  });
  return NextResponse.json(result);
}


