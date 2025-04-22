// app/actions/category.ts
import { client } from "@/lib/apollo-client/apollo-client";
import { CategorySchema } from "@/lib/definitions";
import { gql } from "@apollo/client";

// Simulate a database with an in-memory array
let categories: any = [];
let idCounter = 1;

/**
 * addCategory: validates the FormData, creates a new category and returns it.
 */
export async function addCategory(state: unknown, formData: FormData) {
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
    mutation CreateCategory($name: String!, $description: String) {
      createCategory(name: $name, description: $description) {
        id
        name
        description
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: {
        name: "Test Category",
        description: "This category is created server side",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

/**
 * getCategories: returns the list of categories.
 */
export async function getCategories() {
  return categories;
}

/**
 * deleteCategory: deletes a category by its id.
 */
export async function deleteCategory(state: unknown, formData: FormData) {
  const id = formData.get("id");
  const numericId = Number(id);
  categories = categories.filter((cat: any) => cat.id !== numericId);
  return { success: true };
}
