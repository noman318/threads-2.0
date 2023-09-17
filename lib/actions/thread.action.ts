"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface Params {
  text: string;
  author: string;
  cummunityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  cummunityId,
  path,
}: Params) => {
  try {
    connectToDB();
    const createThread = await Thread.create({ text, author, cummunity: null });
    // console.log("author", author);

    // Update UserModel thread and add it User Table
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
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
        path: "children",
        model: User,
        select: "_id name parentId image",
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
