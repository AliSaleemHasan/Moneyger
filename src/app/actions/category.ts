// app/actions/category.ts
import { client } from "@/lib/apollo-client/apollo-client";
import { CategorySchema } from "@/lib/definitions";
import { gql } from "@apollo/client";
import { getUserSession } from "./auth";
import { redirect } from "next/navigation";
import { Category, User } from "generated";

// Simulate a database with an in-memory array

/**
 * addCategory: validates the FormData, creates a new category and returns it.
 */
export async function addCategory(state: unknown, formData: FormData) {
  const { user, authenticated } = await getUserSession();

  if (!authenticated || !user?.id) redirect("/login");

  const values = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const result = CategorySchema.safeParse(values);

  if (!result.success) {
    // Return validation errors
    return { errors: result.error.flatten().fieldErrors };
  }

  const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategory(
      $userId: Int!
      $name: String!
      $description: String
    ) {
      createCategory(userId: $userId, name: $name, description: $description) {
        name
        description
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: {
        userId: +user.id,
        name: values.name,
        description: values.description,
      },
      refetchQueries: ["getCategories"],
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategory(cat: Category & { user: User }) {
  const { user, authenticated } = await getUserSession();
  console.log(user?.id, cat.user.id, cat);
  if (!cat.id || +cat.user.id !== user?.id)
    return { success: false, error: "Permission Denied!" };

  if (!user || !authenticated) redirect("/login");

  const DELETE_CATEGORY_MUTATION = gql`
    mutation deleteCategory($id: Int!) {
      deleteCategory(id: $id) {
        id
        name
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: DELETE_CATEGORY_MUTATION,
    variables: {
      id: +cat.id,
    },
    refetchQueries: ["getCategories"],
  });
  return { data, success: true };
}
