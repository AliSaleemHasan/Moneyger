import React from "react";

interface ITransactionProps {
  category: string;
  account: string;
  title: string;
  description?: string;
  amount: string;
  type?: string;
  date: string;
}
const Transaction = (props: ITransactionProps) => {
  return (
    <div className="flex  flex-wrap items-center justify-between p-2 bg-card border-border border-2 rounded-md">
      <div className="flex gap-3 items-center divide-x-2 ">
        <div className="flex flex-col space-y-2 pl-2 pr-5  text-sm italic">
          <p> {props.category}</p>
        </div>

        <div className="flex flex-col space-y-2 max-w-md text-sm">
          <p className=" text-muted-foreground">{props.description}</p>
          <p> {props.account}</p>
        </div>
      </div>

      <div className="flex  md:flex-col space-x-2  space-y-2 text-sm">
        <h4
          className={`${
            props.type !== "INCOME" ? "text-destructive" : "text-green-400"
          }`}
        >
          {props.type !== "INCOME" ? "-" : "+"}
          {props.amount}ft
        </h4>
        <p>on {new Date(props.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Transaction;
