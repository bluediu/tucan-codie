/* Core */
import { PrismaClient } from '@prisma/client';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

/* Services */
import { PrinterService } from 'src/printer/printer.service';

/* Reports */
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    console.log(JSON.stringify(order, null, 2));

    const docDefinitions = orderByIdReport({ data: order as any });
    const doc = this.printerService.createPdf(docDefinitions);

    return doc;
  }
}
