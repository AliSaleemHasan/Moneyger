import AddTransaction from "@/components/transactions/add-transaction";
import Transaction from "@/components/transactions/transaction";
import React from "react";

const TransactionListPage = () => {
  return (
    <div>
      <Transaction
        category="Transportation"
        title="Buying grocerrey"
        description="I bought 3 packs of milk to make yougurt, one bread pack and 3
              kilos of checken"
        account="Revolute"
        amount="2341ft"
        date={new Date().toLocaleDateString()}
      />
    </div>
  );
};

export default TransactionListPage;
