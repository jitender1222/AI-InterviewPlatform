import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import InterviewCard from "../components/InterviewCard";
import {
  getCurrentUser,
  getInterviewByUserId,
  getLatestInterview,
} from "@/lib/action/auth.action";

export default async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterview({ userId: user?.id! }),
  ]);
  // const userInterviews = await getInterviewByUserId(user?.id!);
  const hasPastInterview = userInterviews?.length! > 0;
  const hasUpComingInterviews = latestInterviews?.length! > 0;

  console.log("userInterview", userInterviews);
  console.log("latest"), latestInterviews;
  console.log("hasPastInterviews", hasPastInterview);
  console.log("hasUUpcoomign", hasUpComingInterviews);
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready with AI-Powered Practice & FeedBack</h2>
          <p className="text-lg">
            Practice on real interviews questions & get instant feedback
          </p>
          <Button className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className=" max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterview ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven't taken any interview yet </p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpComingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
