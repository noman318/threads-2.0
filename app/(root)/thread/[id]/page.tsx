import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  // console.log("paramsWithId", params.id);
  if (!params.id) return null;
  const user = await currentUser();
  //   console.log("user", user);
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarded");

  const thread = await fetchThreadById(params.id);
  // console.log("threadInPage", thread);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread?._id}
          id={thread?._id}
          currentUserInfo={user?.id || ""}
          parentId={thread?.parentId}
          content={thread?.text}
          author={thread?.author}
          community={thread?.community}
          createdAt={thread?.createdAt}
          comments={thread?.children}
          params={params?.id}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread?.id}
          currentUserImg={user?.imageUrl}
          currentUserId={JSON.stringify(userInfo?._id)}
        />
      </div>
      <div className="mt-10">
        {thread?.children?.map((commentData: any) => (
          <ThreadCard
            key={commentData?._id}
            id={commentData?._id}
            currentUserInfo={user?.id || ""}
            parentId={commentData?.parentId}
            content={commentData?.text}
            author={commentData?.author}
            community={commentData?.community}
            createdAt={commentData?.createdAt}
            comments={commentData?.children}
            params={params?.id}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
