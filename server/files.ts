'use server'

import {prisma} from "@/lib/prisma";

interface AddPhotoDto {
  name: string
  description: string
  fileId: string
  userId: number
  fileType: string
  categoryId: number
}

export async function addPhoto(data: AddPhotoDto): Promise<void> {
  await prisma.file.create({
    data
  })
}
