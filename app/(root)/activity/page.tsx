import React from "react";
import { fetchUser, getActivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  // console.log("userInfo", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo?._id);
  // console.log("activity", activity);
  return (
    <section>
      <h1 className="head-text">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity?.length > 0 ? (
          activity.map((data) => (
            <Link key={data?.id} href={`/thread/${data?.parentId}`}>
              <article className="activity-card">
                <Image
                  src={data.author.image}
                  alt="Profile Image"
                  className="rounded-full object-cover"
                  height={30}
                  width={30}
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {data.author.name}
                  </span>{" "}
                  replied to your thread.
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
