import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { redirect } from "next/navigation";

import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/components/cards/UserCard";

const Page = async ({ params }: { params: { id: string } }) => {
  //   console.log("params", params);
  // markjackman31820@gmail.com
  // logan31820
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);
  //   console.log("communityDetails", communityDetails);
  //   console.log("userInfo", userInfo);
  //   if (!communityDetails?.onboarded) redirect("/onboarding");
  return (
    <section>
      <h1>Profile page</h1>
      <ProfileHeader
        accountId={communityDetails?.createdBy.id}
        authUserId={user?.id}
        name={communityDetails?.name}
        username={communityDetails?.username}
        imageUrl={communityDetails?.image}
        bio={communityDetails?.bio}
        type="Community"
      />
      <div className="mt-10">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs?.map((tab) => (
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
                    {communityDetails?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={"threads"} className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user?.id}
              accountId={communityDetails?._id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value={"members"} className="mt-9 w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imageUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent value={"requests"} className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user?.id}
              accountId={communityDetails?._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
