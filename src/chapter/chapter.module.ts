import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, JwtService],
})
export class ChapterModule {}
