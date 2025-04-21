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
          <p> {props.account}</p>
        </div>

        <div className="flex flex-col space-y-2 max-w-md">
          <strong>{props.title} </strong>
          <p className="text-sm text-muted-foreground">{props.description}</p>
        </div>
      </div>

      <div className="flex  md:flex-col space-x-2  space-y-2 text-sm">
        <h4 className="text-red-400 ">{props.amount}</h4>
        <p>,on {props.date}</p>
      </div>
    </div>
  );
};

export default Transaction;
