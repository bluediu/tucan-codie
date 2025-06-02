/* Core */
import { Module } from '@nestjs/common';

/* Services */
import { StoreReportsService } from './store-reports.service';

/* Controllers */
import { StoreReportsController } from './store-reports.controller';

/* Modules */
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [PrinterModule],
})
export class StoreReportsModule {}
