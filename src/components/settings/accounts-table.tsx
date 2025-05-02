"use client";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";

import { gql, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { SplineIcon } from "lucide-react";
import { Account, User } from "generated";
import { UserContext } from "../authnetication/auth-provider";
import { deleteAccount } from "@/app/actions/Accounts";
import EditAccountForm from "./edit-account-form";
import { getAccounts } from "@/lib/client-queries";

export default function AccountsTable() {
  const user = useContext(UserContext);

  const { loading, error, data } = useQuery(getAccounts, {
    refetchWritePolicy: "overwrite",
    variables: { userId: user?.id },
  });

  const [waitingDelete, setWaitingDelete] = useState<number>(0);

  const handleDelete = async (acct: Account & { user: User }) => {
    setWaitingDelete(acct.id);
    const result = await deleteAccount(acct);

    if (!result.success) {
      toast("There was a problem deleting this category, please try again", {
        action: {
          label: "Retry",
          onClick: () => handleDelete(acct),
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
    <div className="mx-auto  space-y-8 w-full text-foreground">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y ">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Account Name
              </th>
              <th className="text-right px-6 py-3  text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y ">
            {data?.accounts?.map((account: Account & { user: User }) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap flex-1">
                  {account.name}
                </td>
                <td
                  align="right"
                  className="px-6 py-4 whitespace-nowrap space-x-2 flex justify-end "
                >
                  {account.user && account.user.id !== user?.id ? (
                    <>
                      <EditAccountForm account={account} />

                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleDelete(account)}
                        disabled={!!waitingDelete}
                      >
                        {waitingDelete === account.id ? (
                          <SplineIcon className="animate-spin"></SplineIcon>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </>
                  ) : (
                    "ـــــــــــــ"
                  )}
                </td>
              </tr>
            ))}
            {data?.accounts.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-sm ">
                  No Accounts added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
