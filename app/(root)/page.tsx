//app/page.tsx
// import { UserButton } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const results = await fetchPosts(1, 20);
  // console.log("results", results);
  const user = await currentUser();
  if (!user) return null;
  // console.log("typeof user.id", user);
  return (
    <>
      {/* <UserButton afterSignOutUrl="/" /> */}
      <h1 className="head-text text-left">Home</h1>
      <section className="flex flex-col gap-10 mt-9">
        {results?.posts.length === 0 ? (
          <p className="no-results">No Threads Found</p>
        ) : (
          <>
            {results?.posts?.map((post) => (
              // <p className="flex text-lime-50">{post?.parentId}</p>
              <ThreadCard
                key={post?._id}
                id={post?._id}
                currentUserInfo={user?.id || ""}
                parentId={post?.parentId}
                content={post?.text}
                author={post?.author}
                community={post?.community}
                createdAt={post?.createdAt}
                comments={post?.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
