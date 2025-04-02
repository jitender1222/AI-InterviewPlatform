import { isAuthenticated } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthneticated = await isAuthenticated();

  if (isUserAuthneticated) redirect("/");
  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
