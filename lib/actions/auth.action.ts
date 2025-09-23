"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import type { User } from "@/types"; // It's good practice to define types in a separate file

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

/**
 * Creates a session cookie for the authenticated user.
 */
export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // expiresIn is in milliseconds
  });

  // Set the session cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Signs up a new user in the Firestore database.
 */
export async function signUp(params: { uid: string; name: string; email: string; }) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed to create account. Please try again." };
  }
}

/**
 * Signs in a user, creates a record if one doesn't exist, and sets the session cookie.
 */
export async function signIn(params: { email: string; idToken: string; name?: string | null; image?: string | null; }) {
  const { email, idToken, name, image } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    const { uid } = userRecord;
    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    // Create a user document in Firestore if it doesn't exist
    if (!userDoc.exists) {
      await userDocRef.set({
        name: name || userRecord.displayName || email,
        email,
        image: image || userRecord.photoURL || null,
      });
    }

    // Set the session cookie to establish the user's session
    await setSessionCookie(idToken);
    return { success: true, message: "Signed in successfully." };
  } catch (error: any) {
    console.error("Error during sign in:", error);
    return { success: false, message: "Failed to log into account. Please try again." };
  }
}

/**
 * Signs out the current user by deleting the session cookie.
 */
export async function signOut() {
  const cookieStore = cookies();
  // Delete the session cookie to end the user's session
  cookieStore.delete("session");
}

/**
 * Retrieves the current user's data from the session cookie.
 * This is the function that was causing the error.
 */
export async function getCurrentUser(): Promise<User | null> {
  // Get the cookie store and read the 'session' cookie
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    // Verify the session cookie with Firebase Admin SDK
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return null;
    }

    // Return the user data
    return {
      id: userDoc.id,
      ...userDoc.data(),
    } as User;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    // If the cookie is invalid (e.g., expired), delete it
    cookieStore.delete("session");
    return null;
  }
}

/**
 * Checks if a user is currently authenticated.
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}