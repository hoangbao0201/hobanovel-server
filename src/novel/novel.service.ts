import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NovelService {
  constructor(private prismaService: PrismaService) {}

  async findAll(options: {
    q?: string;
    bya?: string;
    take?: number;
    skip?: number;
    sort?: 'desc' | 'asc';
  }) {
    const { q = '', bya = '', take = 10, skip = 0, sort = 'desc' } = options;
    try {
      let where: Prisma.NovelWhereInput = {};
      if (q != '') {
        where = {
          ...where,
          title: {
            contains: q,
          },
        };
      }
      if (bya != '') {
        where = {
          ...where,
          author: {
            name: bya
          },
        };
      }
      const novelsRes = await this.prismaService.novel.findMany({
        skip: +skip,
        take: +take,
        where: where,
        select: {
          novelId: true,
          thumbnail: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          author: {
            select: {
              name: true
            }
          },
          genre: true,
          postedBy: {
            select: {
              name: true,
              userId: true,
              username: true
            }
          },
          description: true,
          _count: {
            select: {
              chapters: true
            }
          }
        }
      });

      return {
        success: true,
        novels: novelsRes,
      };
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
}
