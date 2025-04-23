"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useActionState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AddTransaction() {
  const [state, action, pending] = useActionState(() => {}, undefined);
  const date = new Date().toLocaleDateString();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full p-3 font-bold cursor-pointer border-primary text-xl">
          +
        </Button>
      </DialogTrigger>
      <DialogTitle className=""></DialogTitle>
      <DialogContent className="sm:max-w-[425px] pt-12">
        <div className="max-w-md mx-auto w-full">
          <div className="flex space-x-2 mb-4 [&>*]:flex-1">
            <Button variant="outline">Income</Button>
            <Button variant="default">Expense</Button>
            <Button variant="outline">Transfer</Button>
          </div>

          <form action={action} className="space-y-4  w-full">
            {/* Date Field (read-only) */}
            <div className="grid gap-1">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" value={date} readOnly />
            </div>

            {/* Amount Field */}
            <div className="grid gap-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                disabled={pending}
              />
              {/* {state?.errors?.amount && (
                <p className="text-sm text-red-500">{state.errors.amount}</p>
              )} */}
            </div>

            {/* Category as a Select */}
            <div className="grid gap-1 ">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="">
                <SelectTrigger
                  className="w-full"
                  id="category"
                  disabled={pending}
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
              {/* {state?.errors?.category && (
                <p className="text-sm text-red-500">{state.errors.category}</p>
              )} */}
            </div>

            {/* Account as a Select */}
            <div className="grid gap-1">
              <Label htmlFor="account">Account</Label>
              <Select name="account" defaultValue="">
                <SelectTrigger
                  className="w-full"
                  id="account"
                  disabled={pending}
                >
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Checking">Checking</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
              {/* {state?.errors?.account && (
                <p className="text-sm text-red-500">{state.errors.account}</p>
              )} */}
            </div>

            {/* Note Field */}
            <div className="grid gap-1">
              <Label htmlFor="note">Note</Label>
              <Input
                id="note"
                name="note"
                type="text"
                placeholder="Add a note"
                disabled={pending}
              />
              {/* {state?.errors?.note && (
                <p className="text-sm text-red-500">{state.errors.note}</p>
              )} */}
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={pending}>
                {pending ? "Submitting..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
