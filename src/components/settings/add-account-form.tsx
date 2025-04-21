"use client";
import React, { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addAccount } from "@/app/actions/Accounts";
const AddAccount = () => {
  const [state, action, pending] = useActionState(addAccount, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-1">
        <Label htmlFor="name">Account Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter account name"
          disabled={pending}
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Add Account"}
      </Button>
    </form>
  );
};

export default AddAccount;
