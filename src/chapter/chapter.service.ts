import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private prismaService: PrismaService) {}


  async findAll({ slug }: { slug: string }) {
    const novelId = slug.substring(slug.lastIndexOf('-') + 1);

    try {
      const chaptersRes = await this.prismaService.chapter.findMany({
        where: {
          novelId: +novelId
        },
        select: {
          title: true,
          content: true
        }
      })

      return {
        success: true,
        chapters: chaptersRes
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
  
}
