import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NovelService {
  constructor(private prismaService: PrismaService) {}

  async findAll(options: {
    q?: string;
    byu?: string;
    take?: number;
    skip?: number;
    sort?: 'desc' | 'asc';
  }) {
    const { q = '', byu = '', take = 10, skip = 0, sort = 'desc' } = options;
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
      if (byu != '') {
        where = {
          ...where,
          author: {
            username: byu,
          },
        };
      }
      const novelsRes = await this.prismaService.novel.findMany({
        skip: +skip,
        take: +take,
        where: where,
        select: {
          title: true
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
