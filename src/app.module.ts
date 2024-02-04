import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { NovelModule } from './novel/novel.module';
import { CrawlModule } from './crawl/crawl.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChapterModule } from './chapter/chapter.module';
import { TagNovelModule } from './tag-novel/tag-novel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    NovelModule,
    CrawlModule,
    CloudinaryModule,
    ChapterModule,
    TagNovelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
