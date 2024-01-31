import { Injectable } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';

// import puppeteer from 'puppeteer';
import axios from 'axios';
import * as cheerio from 'cheerio';




@Injectable()
export class NovelService {
  create(createNovelDto: CreateNovelDto) {
    return 'This action adds a new novel';
  }

  async findAll() {

    const response = await axios.get("https://metruyencv.com/");
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    
    return {
      success: true,
      title: title
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} novel`;
  }

  update(id: number, updateNovelDto: UpdateNovelDto) {
    return `This action updates a #${id} novel`;
  }

  remove(id: number) {
    return `This action removes a #${id} novel`;
  }
}
