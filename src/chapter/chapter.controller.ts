import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('/api/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get(":slug/:chapter")
  findOne(
    @Param('slug') slug: string,
    @Param('chapter') chapter: string,
  ) {
    return this.chapterService.findOne({ slug, chapter });
  }

  @Get(":slug")
  findAll(
    @Param('slug') slug: string
  ) {
    return this.chapterService.findAll({ slug });
  }

}
