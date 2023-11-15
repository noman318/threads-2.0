"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import Community from "../models/community.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: Params) => {
  try {
    connectToDB();
    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });
    // console.log("author", author);

    // Update UserModel thread and add it User Table
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
    if (communityIdObject) {
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createThread._id },
      });
    }
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error while Creating threads ${error?.message}`);
  }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "community",
        model: Community,
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });

    const totalPostCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postQuery.exec(); // Call exec() here

    const isNext = totalPostCount > skipAmount + posts.length; // Use posts.length

    return { posts, isNext };
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw error; // Optionally rethrow the error for further handling
  }
};

export const fetchThreadById = async (id: string) => {
  try {
    connectToDB();
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name parentId image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: [
              {
                path: "author",
                model: User,
                select: "_id name parentId image",
              },
            ],
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    console.log("errorInThreadActions", error);
    throw new Error(`Error fetch thread ${error?.message}`);
  }
};

export const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  try {
    connectToDB();
    // adding a comment
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("thread not found");
    }
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();
    originalThread.children.push(savedCommentThread._id);
    await originalThread.save();
    revalidatePath(path);
  } catch (error: any) {
    console.log("error", error);
    throw new Error(`Error while making comment ${error?.message}`);
  }
};
