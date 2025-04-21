import AccountsTable from "@/components/settings/accounts-table";
import AddAccount from "@/components/settings/add-account-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4 ">
      <div>
        <h3 className="text-lg font-medium">Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Add, edit or delete accounts.
        </p>
      </div>
      <Separator />
      <>
        <AddAccount />
        <Separator />
        <AccountsTable />
      </>
    </div>
  );
}
