import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlController } from './crawl.controller';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [CrawlController],
  providers: [CrawlService, JwtService, CloudinaryService],
})
export class CrawlModule {}
