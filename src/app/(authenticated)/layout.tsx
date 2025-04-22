import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import AddTransaction from "@/components/transactions/add-transaction";

export default function AuthenticatedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
