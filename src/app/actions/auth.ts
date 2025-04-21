"use server";
import {
  SignupFormSchema,
  AuthenticationFormState,
  SigninFormSchema,
} from "@/lib/definitions";
import prisma from "@/prisma/prisma";
import { createSession, decrypt, deleteSession } from "@/app/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function signup(
  state: AuthenticationFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it

  const hashedPassword = await bcrypt.hash(password, 10);
  let user = await prisma.user.create({
    data: {
      email,
      name: email.split("@")[0],
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id.toString());

  redirect("/");

  // Call the provider or db to create a user...
}

let checkPassowrdValidity = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compareSync(password, userPassword);
  } catch (err) {
    return false;
  }
};

export async function signin(
  state: AuthenticationFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      message: "Wrong email or password!",
    };
  }

  let equal = await checkPassowrdValidity(password, user.password);
  if (!equal) {
    return {
      message: "Wrong email or password..",
    };
  }

  await createSession(user.id.toString());

  redirect("/");

  // Call the provider or db to create a user...
}

export async function logout() {
  deleteSession();
  redirect("/authentication/login");
}
