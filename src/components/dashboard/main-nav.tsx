"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const main_nav_list = [
  {
    href: "/",
    name: "List",
  },
  {
    href: "/statistics",
    name: "Statistics",
  },
  {
    href: "/settings",
    name: "Settings",
  },
];

const isActive = (name: string, pathname: string) =>
  pathname.includes(name.toLowerCase()) ||
  (pathname === "/" && name === "List");
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {main_nav_list.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-sm font-medium ${
            !isActive(item.name, pathname) && " text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
