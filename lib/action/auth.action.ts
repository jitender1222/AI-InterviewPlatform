"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const oneWeek = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, email, name } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User Already Exist.Please SignIn ",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "Account Created Successfully",
    };
  } catch (error) {
    console.error("Error creating a user", error);
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account",
      };
    }
    await setSessionCookie(idToken);
    console.log("idToken", idToken);
  } catch (error) {
    console.log("Error while signing up the user", error);
  }
}

async function setSessionCookie(idtoken: string) {
  const cookieStore = await cookies();
  console.log("cookie storee", cookieStore);
  const sessionCookie = await auth.createSessionCookie(idtoken, {
    expiresIn: oneWeek,
  });

  console.log(sessionCookie);

  cookieStore.set("session", sessionCookie, {
    maxAge: oneWeek,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie, true);
    console.log("decoded", decodedCookie);

    const userRecord = await db
      .collection("users")
      .doc(decodedCookie.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  // console.log(userId);

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterview(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;
  console.log("userId", userId);
  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  console.log("interviews", interviews.docs);

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
