import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTagNovelDto } from './dto/create-tag-novel.dto';
import { TagNovelService } from './tag-novel.service';

@Controller('/api/tag-novel')
export class TagNovelController {
  constructor(private readonly tagNovelService: TagNovelService) {}

  @Post()
  createMultiple(@Body() createTagNovelDto: CreateTagNovelDto) {
    return this.tagNovelService.create(createTagNovelDto);
  }
}
