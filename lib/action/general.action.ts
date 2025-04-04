import { db } from "@/firebase/admin";

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  // console.log(userId);

  return interview.data() as Interview | null;
}
