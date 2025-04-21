// app/actions/category.ts
import { z } from "zod";

// Zod schema for validating the category
const CategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});

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

  // Simulate database insertion. In production, you’d use your DB client.
  const newCategory = { id: idCounter++, ...result.data };
  categories.push(newCategory);
  return { success: true, newCategory };
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
