// app/actions/Accounts.ts
import { client } from "@/lib/apollo-client/apollo-client";
import { AccountsSchema } from "@/lib/definitions";
import { gql } from "@apollo/client";
import { getUserSession } from "./auth";
import { redirect } from "next/navigation";
import { User, Account } from "generated";

export async function addAccount(state: unknown, formData: FormData) {
  const { user, authenticated } = await getUserSession();

  if (!authenticated || !user?.id) redirect("/login");

  const values = {
    name: formData.get("name"),
  };

  const result = AccountsSchema.safeParse(values);

  if (!result.success) {
    // Return validation errors
    return { errors: result.error.flatten().fieldErrors };
  }

  const CREATE_ACCOUNT_MUTATION = gql`
    mutation CreateAccount($userId: Int!, $name: String!) {
      createAccount(userId: $userId, name: $name) {
        name
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_ACCOUNT_MUTATION,
      variables: {
        userId: +user.id,
        name: values.name,
      },
      refetchQueries: ["getAccounts"],
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editAccount(state: unknown, formData: FormData) {
  const { user, authenticated } = await getUserSession();

  if (!authenticated || !user?.id) redirect("/login");

  const values = {
    name: formData.get("name"),
    id: formData.get("id"),
  };

  const result = AccountsSchema.safeParse(values);

  if (!result.success) {
    // Return validation errors
    return { errors: result.error.flatten().fieldErrors };
  }

  const UPDATE_ACCOUNT_MUTATION = gql`
    mutation UpdateAccount($id: Int!, $userId: Int!, $name: String!) {
      updateAccount(id: $id, userId: $userId, name: $name) {
        name
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: UPDATE_ACCOUNT_MUTATION,
      variables: {
        id: Number(values?.id),
        userId: +user.id,
        name: values.name,
      },
      refetchQueries: ["getAccounts"],
    });
    return { ...data, done: true };
  } catch (error) {
    throw error;
  }
}

export async function deleteAccount(cat: Account & { user: User }) {
  const { user, authenticated } = await getUserSession();
  console.log(user?.id, cat.user.id, cat);
  if (!cat.id || +cat.user.id !== user?.id)
    return { success: false, error: "Permission Denied!" };

  if (!user || !authenticated) redirect("/login");

  const DELETE_ACCOUNT_MUTATION = gql`
    mutation deleteAccount($id: Int!) {
      deleteAccount(id: $id) {
        id
        name
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: DELETE_ACCOUNT_MUTATION,
    variables: {
      id: +cat.id,
    },
    refetchQueries: ["getAccounts"],
  });
  return { data, success: true };
}
