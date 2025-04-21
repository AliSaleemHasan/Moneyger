"use client";
import React, { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/app/actions/category";
const AddCategory = () => {
  const [state, action, pending] = useActionState(addCategory, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-1">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter category name"
          disabled={pending}
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
      </div>

      <div className="grid gap-1">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter category description (optional)"
          disabled={pending}
        />
        {state?.errors?.description && (
          <p className="text-sm text-red-500">{state.errors.description}</p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Add Category"}
      </Button>
    </form>
  );
};

export default AddCategory;
