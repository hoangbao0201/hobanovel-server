import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTagNovelDto {
    @IsArray()
    @IsNotEmpty()
    tags: TypeTags[]
}

class TypeTags {
    @IsNumber()
    @IsNotEmpty()
    index: number

    @IsString()
    @IsNotEmpty()
    name: string
}
