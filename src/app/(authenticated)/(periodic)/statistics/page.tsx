"use client";
import React, { useContext } from "react";
import OverviewCard from "@/components/dashboard/overview-card";
import { Overview } from "@/components/dashboard/overview";
import { useQuery } from "@apollo/client";
import { GET_STATISTICS } from "@/lib/client-queries";
import { UserContext } from "@/components/authnetication/auth-provider";
import { ExpenseIncomePieChart } from "@/components/dashboard/expense-income-pie";

const OverviewStatisticTab = () => {
  const user = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_STATISTICS, {
    variables: {
      userId: user?.id,
      from: "2024-02-01T00:00:00.000Z",
      to: "2026-12-31T23:59:59.999Z",
    },
  });

  if (loading) return <p>loading</p>;

  console.log(data, error);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <OverviewCard
          title="Max Expense Day"
          stats={data?.statistics.maxExpenseDay?.date}
          value={data?.statistics.maxExpenseDay?.amount}
        />
        <OverviewCard
          title="Top Expense Account"
          value={data?.statistics.topExpenseAccount.accountName}
          stats={data?.statistics.topExpenseAccount.total}
        />

        <OverviewCard
          title="Top Expense Category"
          value={data?.statistics.topExpenseCategory.categoryName}
          stats={data?.statistics.topExpenseCategory.totalSpent}
        />

        <OverviewCard
          title="Max Expense Day"
          stats={data?.statistics.maxExpenseDay?.date}
          value={data?.statistics.maxExpenseDay?.amount}
        />
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-8 mt-4 ">
        <Overview data={data.statistics.dailyTotals} />
        <ExpenseIncomePieChart
          data={[
            {
              type: "expense",
              value: Number(data.statistics.totalExpenses),
              fill: "darkRed",
            },
            {
              type: "income",
              value: Number(data.statistics.totalIncome),
              fill: "darkGreen",
            },
          ]}
        />
      </div>
    </>
  );
};

export default OverviewStatisticTab;
