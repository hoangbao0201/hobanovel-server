import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import { CrawlNovelDTO } from './dto/crawlNovel.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/16.16299',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.3 Edge/17.17134',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.3 Edge/17.17134',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.3',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko',
];

@Injectable()
export class CrawlService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Create Novel
  async createNovel(userId: number, { take, novelUrl }: CrawlNovelDTO) {
    try {
      // Check Existence Novel.
      const checkNovel = await this.prismaService.novel.findUnique({
        where: {
          scrapedUrl: novelUrl,
        },
        select: {
          novelId: true,
        },
      });
      if (checkNovel && checkNovel?.novelId) {
        const countChapterNovel = await this.prismaService.chapter.count({
          where: {
            novelId: checkNovel?.novelId,
          },
        });

        await this.createMultipleChaptersNovel({
          novelId: checkNovel?.novelId,
          novelUrl: novelUrl,
          start: countChapterNovel,
          take: +take,
        });

        return {
          success: true,
          message: 'novel exist',
          countChapterNovel: countChapterNovel,
          take: +take,
        };
      }

      // Crawl Data Novel
      const dataNovel = await this.crawlNovel(novelUrl);
      if (!dataNovel?.success) {
        throw new Error();
      }
      const { author, title, genre, tags, thumbnail, description } = dataNovel?.novel;

      // Upload Thumbnail Novel
      const dataThumbnail = await this.cloudinaryService.uploadImageNovelByUrl({
        url: thumbnail,
        type: 'thumbnail',
        width: 600,
        height: 600,
      });

      // Create Novel
      const novelRes = await this.prismaService.novel.create({
        data: {
          title: title,
          scrapedUrl: novelUrl,
          thumbnail: dataThumbnail?.image.secure_url,
          description: description,
          postedById: userId,
          genre: genre,
        },
      });

      // Update Novel
      let dataUpdateNovel: Prisma.NovelUpdateInput = {};
      if(author) {
        dataUpdateNovel = {
          author: {
            connectOrCreate: {
              where: {
                name: author
              },
              create: {
                name: author
              }
            }
          },
        }
      }
      const updateNovelRes = await this.prismaService.novel.update({
        where: {
          novelId: novelRes?.novelId
        },
        data: {
          ...dataUpdateNovel,
          tags: {
            deleteMany: {},
            create: tags?.map((tag) => ({
              tag: {
                connect: {
                  index: tag
                }
              }
            }))
          }
        }
      })

      // Create Multiple Chapter
      await this.createMultipleChaptersNovel({
        novelId: novelRes?.novelId,
        novelUrl: novelUrl,
        start: 0,
        take: +take,
      });

      return {
        success: true,
        dataNovel: dataNovel,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Create Multiple Chapters Novel
  async createMultipleChaptersNovel({
    novelId,
    novelUrl,
    start,
    take,
  }: {
    novelId: number;
    novelUrl: string;
    start: number;
    take: number;
  }) {
    try {
      const n = start + take;
      let i = start + 1;
      let listChapter = [];
      while (i <= n) {
        const dataChapter = await this.crawlChapter(novelUrl + '/chuong-' + i);
        if (!dataChapter?.success) {
          throw new Error();
        }
        if (!dataChapter?.isNext) {
          break;
        }

        // Create Chapter Novel
        const chapterRes = await this.prismaService.chapter.create({
          data: {
            title: dataChapter?.chapter.title,
            content: dataChapter?.chapter.content,
            novelId: novelId,
          },
        });
        i++;
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async crawlNovel(url: string) {
    try {
      const randomUserAgent =
        userAgents[Math.floor(Math.random() * userAgents.length)];

      const response = await axios.get(url, {
        headers: {
          'User-Agent': randomUserAgent,
        },
      });
      const $ = cheerio.load(response.data);
      const title = $(`a[href="${url}"]`)?.text();
      const description = $(`div.content`)?.html();

      const author = $('a[href*="' + 'https://metruyencv.com/tac-gia/' + '"]')
        .text()
        .trim();
      const genre = $(
        'a[href*="' + 'https://metruyencv.com/truyen?genre=' + '"]',
      )
        .attr('href')
        .match(/\d+/)[0]
      const tags = $('a[href*="' + 'https://metruyencv.com/truyen?tag=' + '"]');
      const tagNumbers: number[] = tags
        .toArray()
        .map((element) => {
          const href = $(element).attr('href');
          const tagNumberMatch = href && href.match(/\d+/);
          return tagNumberMatch ? parseInt(tagNumberMatch[0], 10) : null;
        })
        .filter((tagNumber) => tagNumber !== null) as number[];

      return {
        success: true,
        novel: {
          title: title,
          author: author,
          genre: parseInt(genre, 10) || 0,
          tags: tagNumbers,
          thumbnail:
            'https://static.cdnno.com/poster/' +
            url.split('https://metruyencv.com/truyen/')[1] +
            '/default.jpg',
          description: description,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async crawlChapter(url: string) {
    try {
      const randomUserAgent =
        userAgents[Math.floor(Math.random() * userAgents.length)];

      const response = await axios.get(url, {
        headers: {
          'User-Agent': randomUserAgent,
        },
      });
      const $ = cheerio.load(response.data);
      const title = $(`div.nh-read__title`)?.text().trim().split(':')[1].trim();
      const content = $(`div#article.c-c`)?.html().trim();
      const isNext = $('a.nh-read__action')?.last().attr('href') ? false : true;

      return {
        success: true,
        isNext: isNext,
        chapter: {
          title: title,
          content: content,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
