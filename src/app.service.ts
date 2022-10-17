import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { launch } from 'puppeteer';
import { templateInfo, templateData } from './constants';

@Injectable()
export class AppService {
  async getHello(): Promise<Buffer> {
    const data = templateData;
    const templateHtml = readFileSync(join('templates', 'index.html'), 'utf8');
    const outputPath = join('pdfs', 'manifiesto.pdf');

    const template = compile(templateHtml);
    const file = template(data);

    const browser = await launch({ headless: true });

    const page = await browser.newPage();
    await page.setContent(file);

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px'
      },
      path: outputPath
    });

    await browser.close();

    return buffer;
  }
}
