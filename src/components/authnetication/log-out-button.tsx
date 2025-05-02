import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";

const LogoutButton = () => {
  return (
    <DropdownMenuItem>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
