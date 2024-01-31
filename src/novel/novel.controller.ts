import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NovelService } from './novel.service';

@Controller('/api/novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('byu') byu: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('sort') sort: 'desc' | 'asc',
  ) {
    return this.novelService.findAll({ q, byu, take: take, skip: skip, sort });
  }

}
