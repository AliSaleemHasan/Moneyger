import AddCategory from "@/components/add-category-form";
import CategoriesTable from "@/components/categories-table";
import { Separator } from "@/components/ui/separator";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-4 ">
      <div>
        <h3 className="text-lg font-medium">Categories</h3>
        <p className="text-sm text-muted-foreground">
          Add, edit or delete categories.
        </p>
      </div>
      <Separator />
      <>
        <AddCategory />
        <Separator />
        <CategoriesTable />
      </>
    </div>
  );
}
