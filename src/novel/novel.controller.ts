import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';

@Controller('/api/novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  create(@Body() createNovelDto: CreateNovelDto) {
    return this.novelService.create(createNovelDto);
  }

  @Get()
  findAll() {
    return this.novelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovelDto: UpdateNovelDto) {
    return this.novelService.update(+id, updateNovelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novelService.remove(+id);
  }
}
