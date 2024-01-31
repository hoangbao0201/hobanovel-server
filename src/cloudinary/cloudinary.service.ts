import { Injectable } from '@nestjs/common';
import {
    UploadApiErrorResponse,
    UploadApiResponse,
    v2 as cloudinary,
} from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { Readable } from 'stream';
import axios from 'axios';

type CloudinaryResponse = {
    success: boolean;
    image?: UploadApiResponse;
    error?: UploadApiErrorResponse;
};

@Injectable()
export class CloudinaryService {
    constructor(private prismaService: PrismaService) {}

    async uploadImageNovelByUrl(data: {
        url: string;
        type?: "images" | "thumbnail";
        width?: number;
        height?: number;
    }) {
        const { url, type = "images", height = 600 , width = 600 } = data;
        try {
            const { data: imageBuffer } = await axios.get(url, { responseType: 'arraybuffer' });

            const result = await new Promise<UploadApiResponse>(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: `HOBANOVEL/novel/${type}`,
                            transformation: [
                                {
                                    width: +width,
                                    height: +height,
                                    crop: 'limit',
                                },
                            ],
                        },
                        (error, result) => {
                            if (error) {
                                reject({ success: false, error });
                            } else {
                                resolve(result);
                            }
                        },
                    );

                    const readableStream = new Readable();
                    readableStream.push(Buffer.from(imageBuffer));
                    readableStream.push(null);

                    readableStream.pipe(uploadStream);
                },
            );

            // if(type === "thumbnail") {
            //     let dataDeleteImage = null;
            //     if(checkBlog.thumbnailUrl.length > 0) {
            //         const splitUrl = checkBlog.thumbnailUrl.split("/");
            //         dataDeleteImage = await this.deleteImageBlog({ imageId: "HOANGBAOVN/blog/thumbnail/" + splitUrl[splitUrl.length - 1].split(".")[0] })
            //     }
            //     return {
            //         success: true,
            //         blogImage: {
            //             urlImage: result?.url,
            //             result: result
            //         },
            //         dataDeleteImage: dataDeleteImage
            //     }
            // }
            
            // const blogImage = await this.prismaService.blogImage.create({
            //     data: {
            //         blogId: checkBlog.blogId,
            //         urlImage: result.url,
            //     },
            // });
            
            return {
                success: true,
                image: result,
            };
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteImageBlog({
        imageId
    }: {
        imageId: string;
    }) {
        try {
            const uploadStream = cloudinary.uploader.destroy(imageId);
            
            return {
                success: true,
                uploadStream: uploadStream,
                imageId: imageId
            };
        } catch (error) {
            return { success: false, error };
        }
    }
}
