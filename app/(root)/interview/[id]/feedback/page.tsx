import { getCurrentUser, getInterviewByUserId } from "@/lib/action/auth.action";
import { getFeedBackByUserId } from "@/lib/action/general.action";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewByUserId(id);
  if (!interview) redirect("/");

  const feedBack = await getFeedBackByUserId({
    interviewId: id,
    userId: user?.id!,
  });

  return <div>FeedBack Page</div>;
};

export default Page;
