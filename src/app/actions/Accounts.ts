import { z } from "zod";

const AccountSchema = z.object({
  name: z.string().nonempty("Name is required"),
});

// Simulate a database with an in-memory array
let accounts: any = [];
let idCounter = 1;

/**
 */
export async function addAccount(state: unknown, formData: FormData) {
  const values = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const result = AccountSchema.safeParse(values);

  if (!result.success) {
    // Return validation errors
    return { errors: result.error.flatten().fieldErrors };
  }

  // Simulate database insertion. In production, you’d use your DB client.
  const newCategory = { id: idCounter++, ...result.data };
  accounts.push(newCategory);
  return { success: true, newCategory };
}

/**
 * getAccount: returns the list of accounts.
 */
export async function getAccount() {
  return accounts;
}

/**
 * deleteAccount: deletes a category by its id.
 */
export async function deleteAccount(state: unknown, formData: FormData) {
  const id = formData.get("id");
  const numericId = Number(id);
  accounts = accounts.filter((acc: any) => acc.id !== numericId);
  return { success: true };
}
