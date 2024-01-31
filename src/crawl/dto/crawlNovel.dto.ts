import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CrawlNovelDTO {

    @IsString()
    @IsNotEmpty()
    novelUrl: string

    @IsString()
    @IsOptional()
    take?: number

} 