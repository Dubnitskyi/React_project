'use server'

import {prisma} from "@/lib/prisma";

interface AddPhotoDto {
  name: string
  description: string
  fileId: string
  userId: number
  fileType: string
  categoryId: number
  tags: number[]
}

export async function addPhoto(data: AddPhotoDto): Promise<void> {
  const {tags, ...other} = data;
  await prisma.file.create({
    data: {
      ...other,
      tags: {
        connect: tags.map(tagName => ({
          id: tagName,
        })),
      },
    },
  })
}
