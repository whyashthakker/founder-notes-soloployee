"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { categories } from "@/lib/note-types";
import { CreateNoteValues, createNoteSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createNotePosting } from "./actions";
import { Textarea } from "@/components/ui/textarea";

export default function NewNoteForm() {
  const form = useForm<CreateNoteValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues:{
      title: "",
      category: "",
      writerName: "",
      socialMediaUrl: "",
    },
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateNoteValues) {
    const formData = new FormData();
    console.log(values);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string);
      }
    });

    try {
      await createNotePosting(formData);
      alert("Note submitted successfully!");
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  }

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Share your thoughts</H1>
        <p className="text-muted-foreground">
          Capture your ideas and insights.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Note details</h2>
          <p className="text-muted-foreground">
            Provide a note description and your name
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="writerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="@goyashy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="socialMediaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://x.com/goyashy" />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;ll enable categorization in the future, so use the same handle if possible.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <option value="" hidden>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of your card</FormLabel>
                  <FormControl>
                    <Input placeholder="We hired a LinkedIn Influencer..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      onFocus={() => setFocus("description")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting} onClick={() => console.log("Submit button clicked")}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}