import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const AddTransactionSchema = z.object({
  amount: z.number().min(1, "Amount must be added!"),
  type: z.enum(["INCOME", "EXPENSE"]), // Adjust these values to your actual enum
  accountId: z.number().int(),
  categoryId: z.number().int(),
  userId: z.number(),
  note: z
    .string({ message: "Note is required!" })
    .min(4, "Please add any note to remember this transaction well!"),
});

export type AuthenticationFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        confrim?: string[];
      };
      message?: string;
    }
  | undefined;

export type TransactionFormState =
  | {
      errors?: {
        amount?: string[];
        type?: string[];
        accountId?: string[];
        categoryId?: string[];
        userId?: string[];
        note?: string[];
      };
      message?: string;
    }
  | undefined;
export const CategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});

export const AccountsSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});
