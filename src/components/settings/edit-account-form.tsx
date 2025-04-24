"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Account, User } from "generated";
import { editAccount } from "@/app/actions/Accounts";

interface IEditAccountFormProps {
  account: Account & { user: User };
}
export default function EditAccountForm({ account }: IEditAccountFormProps) {
  const [state, action, pending] = useActionState(editAccount, account);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogTitle className=""></DialogTitle>
      <DialogContent className="sm:max-w-[425px] pt-12">
        <form action={action} className="space-y-4">
          <div className="grid gap-1">
            <input
              name="id"
              defaultValue={account.id}
              className="hidden"
            ></input>
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter category name"
              defaultValue={account.name}
              disabled={pending}
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name}</p>
            )}
          </div>

          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Edit Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
