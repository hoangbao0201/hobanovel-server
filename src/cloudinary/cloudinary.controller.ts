import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('/api/images/cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    // @UseGuards(JwtGuard)
    // @Post('/upload/blog')
    // @UseInterceptors(FileInterceptor('image'))
    // uploadImage(
    //     @Request() req,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Query('width') width?: number,
    //     @Query('height') height?: number,
    //     @Query('blogId') blogId?: number,
    //     @Query('type') type?: string,
    // ) {
    //     return this.cloudinaryService.uploadImageBlog({ userId:req.user.userId, file, type, width, height, blogId });
    // }
}

