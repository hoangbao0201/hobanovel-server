import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CrawlNovelDTO {

    @IsString()
    @IsNotEmpty()
    novelUrl: string

    @IsString()
    @IsOptional()
    take?: number

} 