import { NextResponse } from "next/server";
import { getGame, listRounds } from "@/lib/actions/general.action";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');
  if (!gameId) return NextResponse.json({ success: false, message: 'Missing gameId' }, { status: 400 });
  const game = await getGame(gameId);
  if (!game) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  const rounds = await listRounds(gameId);
  return NextResponse.json({ success: true, game, rounds });
}


