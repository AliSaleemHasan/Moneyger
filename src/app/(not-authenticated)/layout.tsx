import { Metadata } from "next";
import Image from "next/image";
import MonegerBlack from "@/../public/MonegerDark.svg";
import { getUserSession } from "../actions/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, authenticated } = await getUserSession();
  if (authenticated) redirect("/");
  return (
    <div className="container relative  max-w-none  h-screen  items-center justify-center grid  lg:grid-cols-2 lg:px-0 ">
      <div className="relative  w-screen lg:w-full    h-full p-5 lg:p-10 text-white dark:border   lg:flex justify-between flex-col">
        <div className="absolute  inset-0 bg-[url('/LoginBackground.jpg')] bg-cover" />
        <div className="relative   z-20 flex items-center text-lg font-medium">
          <Image src={MonegerBlack.src} alt="Logo" width={50} height={50} />
        </div>
        <div className="relative z-20 mt-auto hidden lg:flex flex-col gap-3">
          <h1 className="text-xl font-serif">
            Take control. Track smart. Thrive financially.
          </h1>
          <p className="text-sm">
            Moneyger helps you keep a close eye on your expenses and income, so
            you can understand where your money goes and make better financial
            decisions. With simple tracking and insightful analytics, you'll
            never have to wonder why you're low on budget again. Start managing
            smarter today!
          </p>
        </div>
      </div>
      <div className="lg:p-8 ">{children}</div>
    </div>
  );
}
