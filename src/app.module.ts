/* Core */
import { Module } from '@nestjs/common';

/* Libs */
import { BasicReportsModule } from './basic-reports/basic-reports.module';

/* Modules */
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportsModule],
})
export class AppModule {}
