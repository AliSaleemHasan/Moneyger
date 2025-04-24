// app/actions/category.ts
import { client } from "@/lib/apollo-client/apollo-client";
import { gql } from "@apollo/client";
import { getUserSession } from "./auth";
import { redirect } from "next/navigation";
import { Record } from "generated";
import { AddTransactionSchema, TransactionFormState } from "@/lib/definitions";

export async function addTransaction(
  state: TransactionFormState,
  formData: FormData
) {
  const { user, authenticated } = await getUserSession();

  if (!authenticated || !user?.id) redirect("/login");

  let values = {
    type: formData.get("type"),
    amount: Number(formData.get("amount")),
    categoryId: Number(formData.get("categoryId")),
    accountId: Number(formData.get("accountId")),
    userId: Number(user.id),
    note: formData.get("note"),
  };

  const result = AddTransactionSchema.safeParse(values);

  console.log(result);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const CREATE_TRANSACTION_MUTATION = gql`
    mutation CreateTransaction(
      $accountId: Int!
      $categoryId: Int!
      $amount: Float!
      $type: Type!
      $note: String!
      $userId: Int!
    ) {
      createRecord(
        accountId: $accountId
        categoryId: $categoryId
        amount: $amount
        type: $type
        note: $note
        userId: $userId
      ) {
        amount
        type
      }
    }
  `;

  const { data } = await client.mutate<Record>({
    mutation: CREATE_TRANSACTION_MUTATION,
    variables: {
      accountId: Number(values.accountId),
      categoryId: Number(values.categoryId),
      type: values.type,
      amount: Number(values.amount),
      note: values.note,
      userId: values.userId,
    },
    refetchQueries: ["GetUserRecords"],
  });
  return { message: "Record added Successfully!" };
}
