import { Injectable } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';

import puppeteer from 'puppeteer';


@Injectable()
export class NovelService {
  create(createNovelDto: CreateNovelDto) {
    return 'This action adds a new novel';
  }

  async findAll() {

    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.goto('https://www.indeed.com');

    const title = await page.title();

    await browser.close();
    
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
