"use client";

import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signup } from "@/app/actions/auth";
import FormError from "../ui/form-error";
interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignupForm({ className, ...props }: UserSignUpFormProps) {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className={cn("grid gap-6 mx-10", className)} {...props}>
      <form action={action}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={pending}
            />
          </div>
          {state?.errors?.email && <FormError message={state.errors.email} />}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Write Password.."
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={pending}
            />
          </div>
          {state?.errors?.password && (
            <div className="text-xs text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirm">
              Confirm Password
            </Label>
            <Input
              id="confirm"
              name="confirm"
              placeholder="Confirm Passowrd.."
              type="password"
              autoCapitalize="none"
              autoComplete="confirm"
              autoCorrect="off"
              disabled={pending}
            />
          </div>
          {state?.errors?.confirm && (
            <FormError message={state.errors.confirm} />
          )}

          <Button disabled={pending} type="submit">
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Moneyger - All rights preserved
          </span>
        </div>
      </div>
    </div>
  );
}
