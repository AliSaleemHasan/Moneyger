"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Category, User } from "generated";
import { editCategory } from "@/app/actions/category";

interface IEditCategoryFormProps {
  category: Category & { user: User };
}
export default function EditCategoryForm({ category }: IEditCategoryFormProps) {
  const [state, action, pending] = useActionState(editCategory, category);

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
              defaultValue={category.id}
              className="hidden"
            ></input>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter category name"
              defaultValue={category.name}
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
              defaultValue={category.description || ""}
            />
            {state?.errors?.description && (
              <p className="text-sm text-red-500">{state.errors.description}</p>
            )}
          </div>

          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Edit Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
