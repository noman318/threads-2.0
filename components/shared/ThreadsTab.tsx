import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let results = await fetchUserPosts(accountId);
  //   console.log("results", results);
  if (!results) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {results?.threads?.map((thread: any) => (
        <ThreadCard
          key={thread?._id}
          id={thread?._id}
          currentUserInfo={currentUserId || ""}
          parentId={thread?.parentId}
          content={thread?.text}
          author={
            accountType === "User"
              ? { name: results.name, image: results.image, id: results.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread?.community}
          createdAt={thread?.createdAt}
          comments={thread?.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
