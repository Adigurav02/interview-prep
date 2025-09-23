import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { sendFriendChallengeInvite } from "@/lib/actions/general.action";

/**
 * API Route handler to send a friend challenge invitation.
 * This function is correctly defined as 'async' to handle asynchronous operations.
 */
export async function POST(request: Request) {
  try {
    // 1. Authenticate the user by correctly awaiting the async getCurrentUser function.
    const user = await getCurrentUser();

    // 2. If no user is found, they are not logged in. Return an Unauthorized error.
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: You must be logged in to send an invite." },
        { status: 401 }
      );
    }

    // 3. Parse the incoming request body to get the recipient's email and challenge ID.
    const { toEmail, challengeId } = await request.json();

    // 4. Validate that all required fields are present in the request.
    if (!toEmail || !challengeId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: toEmail and challengeId are required." },
        { status: 400 } // Bad Request
      );
    }

    // 5. Call the server action to handle the logic of sending the invite.
    const result = await sendFriendChallengeInvite({
      fromUserId: user.id,
      toEmail,
      challengeId,
    });

    // 6. Return the result from the server action to the client.
    return NextResponse.json(result);

  } catch (error) {
    // 7. If any unexpected error occurs during the process, log it and return a generic server error.
    console.error("Error in /api/friend-challenge/send-invite:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}