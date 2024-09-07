import { NextResponse } from 'next/server';
import {prisma} from "@/lib/prisma";

/**
 * @swagger
 * /api/files:
 *   get:
 *     description: Returns paginated files
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number (default is 1)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of files to return per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of files
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');

  const skip = (page - 1) * size;

  const data = await prisma.file.findMany({
    skip,
    take: size
  });

  return NextResponse.json(data);
}
