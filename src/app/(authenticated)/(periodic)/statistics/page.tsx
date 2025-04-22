import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OverviewCard from "@/components/dashboard/overview-card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";

const OverviewStatisticTab = () => {
  return (
    <TabsContent value="overview" className="p-2 ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <OverviewCard
          title="Total Revenue"
          stats="+20.1% from last month"
          value="$45,231.89"
        />
        <OverviewCard
          title="Subscriptions"
          stats="+180.1% from last month"
          value="+2350"
        />

        <OverviewCard
          title="Sales"
          stats="+19% from last month"
          value="+12,324"
        />

        <OverviewCard
          title="Active Now"
          stats="+201 since last hour"
          value="+573"
        />
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-7 mt-4 ">
        <Card className="col-span-2 lg:col-span-5 ">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-2 ">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default OverviewStatisticTab;
