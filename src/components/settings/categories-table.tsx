"use client";
import { useActionState, useContext, useState } from "react";
import { Button } from "@/components/ui/button";

import { deleteCategory } from "@/app/actions/category";
import { gql, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { SplineIcon } from "lucide-react";
import { Category, User } from "generated";
import { UserContext } from "../authnetication/auth-provider";
import EditCategoryForm from "./edit-category-form";

const query = gql`
  query getCategories($userId: Int) {
    categories(userId: $userId) {
      id
      name
      description
      user {
        id
        name
      }
    }
  }
`;
export default function CategoriesTable() {
  const user = useContext(UserContext);

  const { loading, error, data } = useQuery(query, {
    refetchWritePolicy: "overwrite",
    variables: { userId: user?.id },
  });

  const [waitingDelete, setWaitingDelete] = useState<number>(0);

  const handleDelete = async (cat: Category & { user: User }) => {
    setWaitingDelete(cat.id);
    const result = await deleteCategory(cat);

    if (!result.success) {
      toast("There was a problem deleting this category, please try again", {
        action: {
          label: "Retry",
          onClick: () => handleDelete(cat),
        },
      });
    }
    setWaitingDelete(0);
  };

  if (error) {
    console.log(error);
  }
  if (loading) return <p>loading..</p>;

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
            {data?.categories?.map((cat: Category & { user: User }) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 whitespace-nowrap flex-1">
                  {cat.name}
                </td>
                <td
                  align="right"
                  className="px-6 py-4 whitespace-nowrap space-x-2 flex items-end "
                >
                  <EditCategoryForm category={cat} />

                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleDelete(cat)}
                    disabled={!!waitingDelete}
                  >
                    {waitingDelete === cat.id ? (
                      <SplineIcon className="animate-spin"></SplineIcon>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </td>
              </tr>
            ))}
            {data?.categories.length === 0 && (
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
