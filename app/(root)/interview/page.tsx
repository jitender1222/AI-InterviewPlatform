import Agent from "@/app/components/Agent";
import { getCurrentUser } from "@/lib/action/auth.action";

const Interview = () => {
  const user = getCurrentUser();
  return (
    <>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
};

export default Interview;
