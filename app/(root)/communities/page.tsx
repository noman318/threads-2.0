import React from "react";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.action";
import CommunityCard from "@/components/cards/CommunityCard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  //   console.log("userInfo", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchCommunities({
    pageNumber: 1,
    pageSize: 20,
    searchString: "",
  });
  // console.log("resultsInSearch", results);
  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>

      <div className="flex mt-14 flex-col gap-9">
        {results.communities.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {results?.communities?.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
