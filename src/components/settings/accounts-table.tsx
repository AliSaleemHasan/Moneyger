"use client";

import { useActionState } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { deleteAccount } from "@/app/actions/Accounts";

export default function AccountsTable() {
  const [accounts, setAccounts] = useState([{ name: "test", id: "1" }]);

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteAccount,
    undefined
  );

  const handleDelete = async (id: number) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    const result: any = await deleteAction(formData);
    if (result.success) {
      setAccounts((prev) => prev.filter((acc: any) => acc.id !== id));
    }
  };

  return (
    <div className="mx-auto  space-y-8 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Account Name
              </th>
              <th className="text-right px-6 py-3  text-xs font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((acc: any) => (
              <tr key={acc.id}>
                <td className="px-6 py-4 whitespace-nowrap flex-1">
                  {acc.name}
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
                    onClick={() => handleDelete(acc.id)}
                    disabled={deletePending}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No accounts added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
