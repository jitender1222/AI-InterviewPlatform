import Agent from "@/app/components/Agent";
import { getCurrentUser } from "@/lib/action/auth.action";

const Interview = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <Agent userName={user?.name!} userId={user?.id!} type="generate" />
    </>
  );
};

export default Interview;
