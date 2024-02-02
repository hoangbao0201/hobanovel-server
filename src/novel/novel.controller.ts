import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NovelService } from './novel.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/api/novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false, type: String, description: 'Query string for search' })
  @ApiQuery({ name: 'bya', required: false, type: String, description: 'Another query parameter' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Number of items to take' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Number of items to skip' })
  @ApiQuery({ name: 'sort', required: false, enum: ['desc', 'asc'], description: 'Sort order' })
  findAll(
    @Query('q') q?: string,
    @Query('bya') bya?: string,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('sort') sort?: 'desc' | 'asc',
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
