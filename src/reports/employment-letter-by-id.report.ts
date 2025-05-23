/* Interfaces */
import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

/* Utils */
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

interface IReportValues {
  employerName: string;
  employerPosition: string;
  employerCompany: string;

  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
}

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterByIdReport = (
  value: IReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employerCompany,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
  } = value;

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({ showDate: true, showLogo: true }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: [
          `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYYY(employeeStartDate)}.\n\n`,
          `Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n`,
          `La jornada laboral del Sr./Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n`,
          `Esta constancia se expide a solicitud del interesado para los fines que considere convenientes.`,
        ],
        style: 'body',
      },
      {
        text: `Atentamente,
          ${employerName}
          ${employerPosition}
          ${employerCompany}
          ${DateFormatter.getDDMMYYYY(new Date())}
        `,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
