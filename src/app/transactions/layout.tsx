import { Toaster } from "sonner";
import ApolloWrapper from "@/lib/apollo-client/apollo-wrapper";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import AddTransaction from "@/components/transactions/add-transaction";

export default function RootLayout({
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
      <div className="flex items-center justify-between flex-wrap py-5 px-4 ">
        <h2 className="text-xl font-bold tracking-tight">
          Welcome to Moneyger
        </h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <div className="h-full w-full  px-4">
        {children}
        <div className="absolute right-10 bottom-10">
          <AddTransaction />
        </div>
      </div>
    </div>
  );
}
