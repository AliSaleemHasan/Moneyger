import Link from "next/link";
import { UserLoginForm } from "@/components/authnetication/user-login-from";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute  right-6 top-6 lg:right-12 lg:top-12 text-white lg:text-black z-40"
        )}
      >
        Create Account
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Easily manage your expenses
          </h1>
          <p className="text-sm text-muted-foreground">Login to Moneyger</p>
        </div>
        <UserLoginForm />
      </div>
    </>
  );
}
