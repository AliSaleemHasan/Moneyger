import AddCategory from "@/components/settings/add-category-form";
import CategoriesTable from "@/components/settings/categories-table";
import { Separator } from "@/components/ui/separator";

export default function SettingsCategoryPage() {
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
