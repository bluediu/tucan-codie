/* Core */
import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';

/* Service */
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: number,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    this.sendPdfResponse(response, pdfDoc, 'Countries Report');
  }

  @Get('countries/continent/:continent')
  async getCountriesReportByContinent(
    @Res() response: Response,
    @Param('continent') continent: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.getCountriesByContinent(continent);

    this.sendPdfResponse(response, pdfDoc, 'Countries by Continent Report');
  }

  private sendPdfResponse(
    response: Response,
    pdfDoc: PDFKit.PDFDocument,
    title: string,
  ) {
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = title;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
