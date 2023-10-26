import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  //   console.log("userInfo", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchUsers({
    userId: user?.id,
    pageNumber: 1,
    pageSize: 20,
    searchString: "",
  });
  // console.log("resultsInSearch", results);
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="flex mt-14 flex-col gap-9">
        {results.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {results?.users?.map((person) => (
              <UserCard
                key={person?.id}
                id={person?.id}
                name={person.name}
                username={person.username}
                imageUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
