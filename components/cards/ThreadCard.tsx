import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  currentUserInfo: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
const ThreadCard = ({
  id,
  currentUserInfo,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  // console.log("isCommentInThread", isComment);
  // console.log("commentsInThread", comments?.length);
  return (
    <article
      className={`flex flex-col w-full rounded-xl ${
        isComment ? "px-0 xs:px-7" : " bg-dark-2 p-7"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="h-11 w-11 relative"
            >
              <Image
                src={author?.image}
                alt="profile_image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-body-semibold text-light-1">
                {author?.name}
              </h4>
            </Link>
            <h2 className="text-small-regular mt-2 text-light-2">{content}</h2>
            <div className={`${isComment && "mb-10"} flex mt-5 flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src={`/assets/heart-gray.svg`}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src={`/assets/reply.svg`}
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src={`/assets/repost.svg`}
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src={`/assets/share.svg`}
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {/* {isComment && comments.length > 0 && (
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {comments.length} replies
                </p>
              )} */}
              {comments?.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments?.length} repl{comments?.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
