import * as z from "zod";

export const ThreadsValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
  accountId: z.string(),
});

export const CommentsValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
  //   comment: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
});
