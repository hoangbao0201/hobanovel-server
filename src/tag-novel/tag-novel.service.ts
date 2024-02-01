import { Injectable } from '@nestjs/common';
import { CreateTagNovelDto } from './dto/create-tag-novel.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagNovelService {
  constructor(private prismaService: PrismaService) {}

  async create(createTagNovelDto: CreateTagNovelDto) {
    try {
      const { tags } = createTagNovelDto;

      const tagsRes = await this.prismaService.tag.createMany({
        data: tags
      });
      
      return {
        success: true,
        tags: tagsRes
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
}
