"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

// ==============================================
// Friend Challenge: Firestore-backed server actions
// Collections used:
// - friendChallengeInvites: { id, fromUserId, toEmail, challengeId, status, createdAt }
// - friendChallengeRounds: { id, gameId, roundNumber, challengerId, opponentId, challengeId, challengerScore, opponentScore, winner, createdAt }
// - friendChallengeGames: { id, playerAId, playerBId, aPoints, bPoints, totalRounds, status, createdAt, updatedAt }
// ==============================================

type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface SendFriendChallengeInviteParams {
  fromUserId: string;
  toEmail: string;
  challengeId: string;
}

export async function sendFriendChallengeInvite(params: SendFriendChallengeInviteParams) {
  const { fromUserId, toEmail, challengeId } = params;
  const inviteRef = db.collection('friendChallengeInvites').doc();
  const payload = {
    id: inviteRef.id,
    fromUserId,
    toEmail: toEmail.toLowerCase(),
    challengeId,
    status: 'pending' as InviteStatus,
    createdAt: new Date().toISOString(),
  };
  await inviteRef.set(payload);
  return { success: true, inviteId: inviteRef.id };
}

export async function listIncomingInvites(userEmail: string) {
  const q = await db
    .collection('friendChallengeInvites')
    .where('toEmail', '==', userEmail.toLowerCase())
    .where('status', '==', 'pending')
    .orderBy('createdAt', 'desc')
    .get();
  return q.docs.map((d) => d.data());
}

export async function acceptInvite(inviteId: string, acceptingUserId: string) {
  const inviteDoc = await db.collection('friendChallengeInvites').doc(inviteId).get();
  if (!inviteDoc.exists) return { success: false, message: 'Invite not found' };
  const invite = inviteDoc.data() as any;
  if (invite.status !== 'pending') return { success: false, message: 'Invite not pending' };

  // Create or find a game between the two players
  const playerAId = invite.fromUserId as string;
  const playerBId = acceptingUserId;

  const gameRef = db.collection('friendChallengeGames').doc();
  const gamePayload = {
    id: gameRef.id,
    playerAId,
    playerBId,
    aPoints: 0,
    bPoints: 0,
    totalRounds: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await gameRef.set(gamePayload);

  // Mark invite accepted
  await inviteDoc.ref.update({ status: 'accepted' as InviteStatus });

  return { success: true, gameId: gameRef.id, challengeId: invite.challengeId, playerAId, playerBId };
}

export interface RecordRoundParams {
  gameId: string;
  roundNumber: number; // 1..5
  challengerId: string;
  opponentId: string;
  challengeId: string;
  challengerScore: number; // 0..100
  opponentScore: number; // 0..100
}

export async function recordRound(params: RecordRoundParams) {
  const { gameId, roundNumber, challengerId, opponentId, challengeId, challengerScore, opponentScore } = params;

  // Enforce 5 rounds max
  const gameRef = db.collection('friendChallengeGames').doc(gameId);
  const gameSnap = await gameRef.get();
  if (!gameSnap.exists) return { success: false, message: 'Game not found' };
  const game = gameSnap.data() as any;
  if (game.totalRounds >= 5) return { success: false, message: 'Max rounds reached' };

  const roundRef = db.collection('friendChallengeRounds').doc();
  const winner = challengerScore === opponentScore ? 'tie' : challengerScore > opponentScore ? challengerId : opponentId;
  await roundRef.set({
    id: roundRef.id,
    gameId,
    roundNumber,
    challengerId,
    opponentId,
    challengeId,
    challengerScore,
    opponentScore,
    winner,
    createdAt: new Date().toISOString(),
  });

  // 20 points per round winner
  const aWon = winner === game.playerAId;
  const bWon = winner === game.playerBId;
  const aPoints = game.aPoints + (aWon ? 20 : 0);
  const bPoints = game.bPoints + (bWon ? 20 : 0);
  const totalRounds = (game.totalRounds || 0) + 1;

  let status = 'active';
  let gameWinner: 'A' | 'B' | 'tie' | null = null;
  if (totalRounds >= 5) {
    status = 'completed';
    gameWinner = aPoints === bPoints ? 'tie' : aPoints > bPoints ? 'A' : 'B';
  }

  await gameRef.update({ aPoints, bPoints, totalRounds, status, updatedAt: new Date().toISOString(), gameWinner: gameWinner || null });

  return { success: true, roundId: roundRef.id, aPoints, bPoints, totalRounds, status, gameWinner };
}

export async function getGame(gameId: string) {
  const snap = await db.collection('friendChallengeGames').doc(gameId).get();
  if (!snap.exists) return null;
  return snap.data();
}

export async function listRounds(gameId: string) {
  const q = await db
    .collection('friendChallengeRounds')
    .where('gameId', '==', gameId)
    .orderBy('roundNumber', 'asc')
    .get();
  return q.docs.map((d) => d.data());
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
