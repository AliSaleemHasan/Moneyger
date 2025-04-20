import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Statistical Overview",
  description: "Moneyger statistical overview page",
};

const OverviewLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className=" flex-col md:flex  ">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="px-1 md:px-6" />
          <div className="ml-auto flex items-center space-x-6">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between flex-wrap space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4 ">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </div>
    </div>
  );
};

export default OverviewLayout;
