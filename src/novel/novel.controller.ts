import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NovelService } from './novel.service';

@Controller('/api/novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('bya') bya: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('sort') sort: 'desc' | 'asc',
  ) {
    return this.novelService.findAll({ q, bya, take: take, skip: skip, sort });
  }

  @Get(":slug")
  findOne(
    @Param('slug') slug: string
  ) {
    return this.novelService.findOne(slug);
  }
}
