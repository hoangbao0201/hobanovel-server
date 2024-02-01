import { Module } from '@nestjs/common';
import { TagNovelService } from './tag-novel.service';
import { JwtService } from '@nestjs/jwt';
import { TagNovelController } from './tag-novel.controller';

@Module({
  controllers: [TagNovelController],
  providers: [TagNovelService, JwtService],
})
export class TagNovelModule {}
