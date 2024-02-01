import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private prismaService: PrismaService) {}


  async findOne({ slug, chapter }: { slug: string, chapter: string }) {
    const novelId = slug.substring(slug.lastIndexOf('-') + 1);
    const chapterNumber = chapter.substring(chapter.lastIndexOf('-') + 1);

    try {
      const chapterRes = await this.prismaService.chapter.findUnique({
        where: {
          chapterNumber_novelId: {
            chapterNumber: +chapterNumber,
            novelId: +novelId
          }
        },
        select: {
          title: true,
          chapterNumber: true,
          novelId: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      return {
        success: true,
        chapter: chapterRes
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }

  async findAll({ slug }: { slug: string }) {
    const novelId = slug.substring(slug.lastIndexOf('-') + 1);

    try {
      const chaptersRes = await this.prismaService.chapter.findMany({
        where: {
          novelId: +novelId
        },
        select: {
          title: true,
          novelId: true,
          chapterNumber: true,
          createdAt: true,
          updatedAt: true
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
