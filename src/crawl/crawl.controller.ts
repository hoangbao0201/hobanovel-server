import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CrawlNovelDTO } from './dto/crawlNovel.dto';
import { take } from 'rxjs';

@Controller('/api/crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @UseGuards(JwtGuard)
  @Post('/novel/metruyenchu')
  createNovel(@Request() req, @Body() crawlNovelDTO: CrawlNovelDTO) {
    return this.crawlService.createNovel(req.user.userId, {
      take: crawlNovelDTO?.take ? crawlNovelDTO?.take : 1,
      novelUrl: crawlNovelDTO?.novelUrl,
    });
  }
}
