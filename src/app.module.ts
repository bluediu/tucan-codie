/* Core */
import { Module } from '@nestjs/common';

/* Libs */
import { BasicReportsModule } from './basic-reports/basic-reports.module';

/* Modules */
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [BasicReportsModule, PrinterModule],
})
export class AppModule {}
