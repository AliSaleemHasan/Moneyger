"use client";
import { getTransactions } from "@/lib/client-queries";
import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { UserContext } from "../authnetication/auth-provider";
import Transaction from "./transaction";

const TransactionsList = () => {
  const user = useContext(UserContext);
  const { loading, error, data } = useQuery(getTransactions, {
    variables: {
      userId: user?.id,
      first: 40,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>loading...</p>;

  return (
    <div className="flex flex-col gap-3">
      {data.records?.edges?.map((item: any, index: number) => (
        <Transaction
          key={index}
          category={item.node.category.name}
          title={""}
          description={item.node.note}
          account={item.node.account.name}
          type={item.node.type}
          amount={+item.node.amount + "fr"}
          date={item.node.createdAt}
        />
      ))}
    </div>
  );
};

export default TransactionsList;
