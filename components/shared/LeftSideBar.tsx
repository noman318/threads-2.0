"use client";

import React from "react";
import Link from "next/link";
import { sidebarLinks } from "@/constants/index";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

const LeftSideBar = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-col flex-1 gap-6 px-6">
        {sidebarLinks?.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link?.imgURL}
                alt="link_icons"
                height={24}
                width={24}
              />
              <p className="max-lg:hidden text-light-1">{link?.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src={"/assets/logout.svg"}
                alt="logout"
                height={24}
                width={24}
              />
              <p className="max-lg:hidden text-light-2">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
