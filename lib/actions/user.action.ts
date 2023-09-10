// "use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../database";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  // try {
  //   await User.findOneAndUpdate(
  //     { id: userId },
  //     {
  //       username: username.toLowerCase(),
  //       name,
  //       bio,
  //       image,
  //       onboarded: true,
  //     },
  //     { upsert: true }
  //   );
  //   if (path === "/profile/edit") {
  //     revalidatePath(path);
  //   }
  // } catch (error: any) {
  //   console.log("error in User action", error);
  //   throw new Error(`Failed to create User ${error.message}`);
  // }
}
