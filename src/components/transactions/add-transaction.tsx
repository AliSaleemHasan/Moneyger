"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useActionState, useContext, useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@apollo/client";
import { getAccounts, getCategories } from "@/lib/client-queries";
import { UserContext } from "../authnetication/auth-provider";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { addTransaction } from "@/app/actions/transactions";
import { Type } from "generated";
import FormError from "../ui/form-error";
import { toast } from "sonner";
export default function AddTransaction() {
  const [selected, setSelected] = useState("EXPENSE");
  const user = useContext(UserContext);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(getCategories, {
    fetchPolicy: "cache-and-network",

    variables: { userId: user?.id },
  });

  const {
    loading: accountsLoading,
    error: accountsError,
    data: accountsData,
  } = useQuery(getAccounts, {
    fetchPolicy: "cache-and-network",
    variables: { userId: user?.id },
  });

  const [state, action, pending] = useActionState(addTransaction, undefined);
  const [open, setOpen] = useState<boolean>(false);
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
      setOpen(false);
    }
  }, [state]);
  if (
    categoriesLoading ||
    accountsLoading ||
    !categoriesData.categories ||
    !accountsData.accounts
  )
    return <Loader2 className="animate-spine text-primary" />;

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="rounded-full p-3 font-bold cursor-pointer border-primary text-xl">
          +
        </Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-xl pt-12">
        <DialogDescription></DialogDescription>

        <form action={action} className="space-y-4  w-full">
          {/* Transaction Type Radio Group */}
          <div className="space-y-1">
            <RadioGroup
              name="type"
              value={selected}
              // Optionally leave defaultValue or integrate with reactFormStatus as required
              defaultValue="EXPENSE"
              className="flex items-center gap-2 pt-2"
            >
              {/* Income Option */}
              <label className="flex-1 block">
                <RadioGroupItem
                  id="income"
                  value="INCOME"
                  className="sr-only peer"
                  // You might add an onChange handler here, if necessary
                />
                <Button
                  type="button"
                  onClick={() => setSelected("INCOME")}
                  variant={selected !== "EXPENSE" ? "default" : "outline"}
                  className={`w-full border border-gray-300 `}
                  // Optionally, you can still let the label click trigger the radio selection
                >
                  Income
                </Button>
              </label>

              {/* Expense Option */}
              <label className="flex-1 block">
                <RadioGroupItem
                  id="expense"
                  value="EXPENSE"
                  className="sr-only peer"
                />
                <Button
                  type="button"
                  onClick={() => setSelected("EXPENSE")}
                  variant={selected === "EXPENSE" ? "default" : "outline"}
                  className={`w-full border border-gray-300 XS`}
                >
                  Expense
                </Button>
              </label>
            </RadioGroup>
          </div>

          {/* Date Field (read-only) */}
          <div className="grid gap-1">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" value={date} readOnly disabled />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              name="note"
              type="text"
              placeholder="Note"
              disabled={pending}
            />
          </div>
          {state?.errors?.note && <FormError message={state.errors.note} />}

          {/* Amount Field */}
          <div className="grid gap-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step={0.0001}
              placeholder="Enter amount"
              disabled={pending}
            />
          </div>
          {state?.errors?.amount && <FormError message={state.errors.amount} />}
          {/* Category as a Select */}
          <div className="grid gap-1">
            <Label htmlFor="category">Category</Label>
            <Select name="categoryId" defaultValue="1">
              <SelectTrigger
                id="category"
                disabled={pending}
                className="w-full"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.categories?.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Account as a Select */}
          <div className="grid gap-1">
            <Label htmlFor="account">Account</Label>
            <Select name="accountId" defaultValue="1">
              <SelectTrigger id="account" disabled={pending} className="w-full">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {accountsData.accounts?.map((acc: any) => (
                  <SelectItem key={acc.id} value={acc.id.toString()}>
                    {acc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form Submit Button */}
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
