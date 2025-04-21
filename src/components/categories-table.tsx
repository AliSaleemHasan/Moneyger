"use client";

import { useActionState } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { deleteCategory } from "@/app/actions/category";

export default function CategoriesTable() {
  const [categories, setCategories] = useState([
    { name: "test", description: "test", id: "1" },
  ]);

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteCategory,
    undefined
  );

  const handleDelete = async (id: number) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    const result: any = await deleteAction(formData);
    if (result.success) {
      setCategories((prev) => prev.filter((cat: any) => cat.id !== id));
    }
  };

  return (
    <div className="mx-auto  space-y-8 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category Name
              </th>
              <th className="text-right px-6 py-3  text-xs font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat: any) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 whitespace-nowrap flex-1">
                  {cat.name}
                </td>
                <td
                  align="right"
                  className="px-6 py-4 whitespace-nowrap space-x-2"
                >
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                    disabled={deletePending}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No categories added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
