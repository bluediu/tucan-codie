/* Core */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

/* Libs */
import { continents, PrismaClient } from '@prisma/client';

/* Service */
import { PrinterService } from 'src/printer/printer.service';

/* Helpers */
import {
  getCountryReport,
  getHelloWorldReport,
  getEmploymentLetterReport,
  getEmploymentLetterByIdReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Josue' });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Josue',
      employerPosition: 'Gerente de Recursos Humanos',
      employerCompany: 'Tucan Code Corp.',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: { local_name: { not: null } },
    });

    const docDefinition = getCountryReport({ countries });
    return this.printerService.createPdf(docDefinition);
  }

  async getCountriesByContinent(continent: string) {
    const countries = await this.countries.findMany({
      where: {
        local_name: { not: null },
        continent: {
          equals: continent as continents,
          // mode: 'insensitive',
        },
      },
    });

    const docDefinition = getCountryReport({ countries });
    return this.printerService.createPdf(docDefinition);
  }
}
