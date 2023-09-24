import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const Page = async ({ params }: { params: { id: string } }) => {
  //   console.log("params", params);
  // markjackman31820@gmail.com
  // logan31820
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  //   console.log("userInfo", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <h1>Profile page</h1>
      <ProfileHeader
        accountId={userInfo?.id}
        authUserId={user?.id}
        name={userInfo?.name}
        username={userInfo?.username}
        imageUrl={userInfo?.image}
        bio={userInfo?.bio}
      />
      <div className="mt-10">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs?.map((tab) => (
              <TabsTrigger key={tab?.label} value={tab.value} className="tab">
                <Image
                  src={tab?.icon}
                  alt={tab?.label}
                  height={24}
                  width={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab?.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-light-2 !text-tiny-medium">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs?.map((tab) => (
            <TabsContent key={`content=${tab.label}`} value={tab.value}>
              <ThreadsTab
                currentUserId={user?.id}
                accountId={userInfo?.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
