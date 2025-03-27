import { Button } from "@/components/ui/button";
import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  techstack,
  role,
  type,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizeType = /mix/gi.test(type) ? "Mixed" : "technical";
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D,YYYY");
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <div className="badge-text">{normalizeType}</div>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={80}
            height={80}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calender"
                width={22}
                height={22}
              />
              <span>{formattedDate}</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <span>{feedback?.totalScore || "---"}/100</span>
            </div>
          </div>
          <span className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills"}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check FeedBack" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
