import {Category, Tag, User} from "@prisma/client";

export interface FullFile {
  id: number;
  name: string;
  description: string | null;
  fileId: string;
  fileType: string;
  userId: number;
  categoryId: number;
  tags: Tag[];
  category: Category;
  user: User
}
