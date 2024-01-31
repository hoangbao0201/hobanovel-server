import { Module } from '@nestjs/common';  
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, JwtService],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
