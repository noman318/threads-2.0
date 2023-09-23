"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadsValidation } from "@/lib/validation/threads";
import { updateUser } from "@/lib/actions/user.action";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.action";

interface Props {
  userId: string;
}

const PostThread = ({ userId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ThreadsValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadsValidation>) => {
    console.log("values", values);
    await createThread({
      text: values.thread,
      author: userId,
      cummunityId: null,
      path: pathname,
    });
    console.log("Created successfully");
    router.push("/");
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Content of thread
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostThread;
