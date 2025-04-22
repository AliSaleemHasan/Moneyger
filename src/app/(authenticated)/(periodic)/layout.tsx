import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import AddTransaction from "@/components/transactions/add-transaction";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
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
        <div className="fixed right-10 bottom-10">
          <AddTransaction />
        </div>
      </div>
    </>
  );
};

export default layout;
