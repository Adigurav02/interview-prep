"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Define parameter types for clarity
interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password?: string;
}

interface SignInParams {
  email: string;
  idToken: string;
  name?: string | null;
  image?: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// This function is already correct
export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

// This function is correct
export async function signUp(params: SignUpParams) {
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
    if (error.code === "auth/email-already-exists") {
      return { success: false, message: "This email is already in use" };
    }
    return { success: false, message: "Failed to create account. Please try again." };
  }
}

// This function is correct
export async function signIn(params: SignInParams) {
  const { email, idToken, name, image } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    const { uid } = userRecord;
    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      await userDocRef.set({
        name: name || userRecord.displayName || email,
        email,
        image: image || userRecord.photoURL || null,
      });
    }

    await setSessionCookie(idToken);
    return { success: true, message: "Signed in successfully." };
  } catch (error: any) {
    console.error("Error during sign in:", error);
    return { success: false, message: "Failed to log into account. Please try again." };
  }
}

// =======================================================
// ===== UPDATED: Sign out user by clearing the session cookie =====
// =======================================================
export async function signOut() {
  // THE FIX: First get the cookie store, then call .delete()
  const cookieStore = cookies();
  cookieStore.delete("session");
}

// =======================================================
// ===== UPDATED: Get current user from session cookie =====
// =======================================================
export async function getCurrentUser(): Promise<User | null> {
  // THE FIX: First get the cookie store, then call .get()
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) return null;

    return {
      id: userRecord.id,
      ...userRecord.data(),
    } as User;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    // If cookie is invalid/expired, it's good practice to delete it
    cookieStore.delete("session");
    return null;
  }
}

// This function is correct because its dependency (getCurrentUser) is now fixed
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}