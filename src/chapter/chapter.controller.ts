import { Controller, Request, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

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

  @UseGuards(JwtGuard)
  @Patch()
  fixAll(
    @Request() req
  ) {
    return this.chapterService.updateAll();
  }
}
