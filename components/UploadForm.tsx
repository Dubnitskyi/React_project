'use client'

import {useState, useTransition} from "react";
import {ClientUploadedFileData} from "uploadthing/types";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Button} from "./ui/button";
import {Category} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addPhoto} from "@/server/files";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {generateUploadButton} from "@uploadthing/react";
import type {OurFileRouter} from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  categoryId: z.string(),
})

interface Props {
  categories: Category[]
}

export function UploadForm({categories}: Props) {
  const {data: session} = useSession()

  function onSuccessUpload([file]: ClientUploadedFileData<{}>[]) {
    setUploadedFileId(file)
  }

  function onErrorUpload(error: Error) {
    setUploadedFileId(null)
    toast.error(error.message)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: categories[0].id.toString(),
    }
  })

  const [, startTransition] = useTransition()
  const [uploadedFileId, setUploadedFileId] = useState<ClientUploadedFileData<{}> | null>(null)

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!uploadedFileId) {
      return
    }
    startTransition(async () => {
      await addPhoto({
        name: values.name,
        fileId: uploadedFileId.key,
        categoryId: +values.categoryId,
        description: values.description ?? '',
        fileType: uploadedFileId.type,
        userId: +(session?.user?.id ?? '')
      })
      redirect('/')
    })
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Add file
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-80"
        >
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="File title"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="File description"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Category
                </FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="File description"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(({id, name}) => (
                        <SelectItem key={id} value={id.toString()}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div>
            {uploadedFileId
              ? <Button
                className="w-full"
                disabled
              >
                File uploaded
              </Button>
              : <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={onSuccessUpload}
                className="ut-button:bg-indigo-500 ut-button:w-full ut-allowed-content:hidden"
                onUploadError={onErrorUpload}
              />
            }
          </div>
          <Button
            type="submit"
            disabled={!uploadedFileId}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </Form>

    </div>
  )
}
