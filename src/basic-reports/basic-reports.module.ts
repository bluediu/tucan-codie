/* Core */
import { Module } from '@nestjs/common';

/* Service */
import { BasicReportsService } from './basic-reports.service';

/* Controller */
import { BasicReportsController } from './basic-reports.controller';

/* Printer Module */
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PrinterModule],
})
export class BasicReportsModule {}
