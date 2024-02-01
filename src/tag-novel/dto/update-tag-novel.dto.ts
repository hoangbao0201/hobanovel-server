import { PartialType } from '@nestjs/mapped-types';
import { CreateTagNovelDto } from './create-tag-novel.dto';

export class UpdateTagNovelDto extends PartialType(CreateTagNovelDto) {}
