import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { RedisClientOptions } from 'redis';



@Module({
  imports: [
    CacheModule.register({}),
  ],
  controllers: [NovelController],
  providers: [
    NovelService,
    JwtService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class NovelModule {}
