import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const htmlAdvertisement  = "<div class=\"pt-3 text-center\" style=\"margin-right: -1rem;\"><div class=\"mb-1 fz-13\"><small class=\"text-muted\"><small>— QUẢNG CÁO —</small></small></div><div class=\"my-1\"></div></div>"
const htmlAdvertisement1 = "<div class=\"pt-3 text-center\" style=\"margin-right: -1rem;\"><div class=\"mb-1 fz-13\"><small class=\"text-muted\"><small>— QUẢNG CÁO —</small></small></div><div class=\"my-1\"></div></div>"

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

  async updateAll() {
    try {
      const chaptersRes = await this.prismaService.chapter.findMany({
        // where: {
        //   novelId: 3
        // },
        select: {
          novelId: true,
          chapterNumber: true,
          content: true
        }
      });

      let i = 0;
      while(i<chaptersRes?.length) {
        const chaptersUpdate = await this.prismaService.chapter.update({
          where: {
            chapterNumber_novelId: {
              novelId: chaptersRes[i].novelId,
              chapterNumber: chaptersRes[i].chapterNumber
            }
          },
          data: {
            content: chaptersRes[i].content.replace(new RegExp(`${htmlAdvertisement}`, 'g'), '')
          }
        });
        i++;
      }

      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
  

  // async updateAllHanle(listChapter) {
  //   try {
  //     let i = 1;
  //     while(i<=listChapter) {
  //       const chaptersUpdate = await this.prismaService.chapter.update(listChapter[i]);
  //     }

  //     return {
  //       success: true,
  //       // chaptersUpdate: chaptersUpdate
  //     }
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error
  //     }
  //   }
  // }
}
