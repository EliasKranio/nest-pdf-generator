import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  //@Header('Content-Type', 'application/pdf')
  //@Header('Content-Disposition', 'attachment; filename=manifiesto.pdf')
  async getHello(
  ): Promise<any> {
    const buffer = await this.appService.getHello();

    //return new StreamableFile(buffer);
    return 'Pdf almacenado en la carpeta pdfs';
  }
}
