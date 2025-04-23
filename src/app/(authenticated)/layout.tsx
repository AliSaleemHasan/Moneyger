import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { getUserSession } from "../actions/auth";
import { redirect } from "next/navigation";
import AuthProvider from "@/components/authnetication/auth-provider";

export default async function AuthenticatedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, authenticated } = await getUserSession();
  if (!authenticated) redirect("/login");

  return (
    <AuthProvider user={user}>
      <div className=" flex-col md:flex  container mx-auto h-screen   ">
        <div className="border-b px-4">
          <div className="flex h-16 items-center ">
            <MainNav />
            <div className="ml-auto flex items-center space-x-6">
              <UserNav />
            </div>
          </div>
        </div>

        {children}
      </div>
    </AuthProvider>
  );
}
