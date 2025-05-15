/* Interfaces */
import { TDocumentDefinitions } from 'pdfmake/interfaces';

/* Sections */
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';

import { countries as Country } from '@prisma/client';

interface IReportOptions {
  countries: Country[];
}

export const getCountryReport = (
  options: IReportOptions,
): TDocumentDefinitions => {
  const { countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Countries Report',
      subtitle: 'List of countries',
      showDate: true,
      showLogo: true,
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01',
        // layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id,
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      // Total table
      {
        text: 'Total',
        style: { fontSize: 18, bold: true, margin: [0, 40, 0, 0] },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],

          body: [
            [
              { text: 'Total Countries', colSpan: 2, bold: true },
              {},
              {},
              { text: `${countries.length.toString()} countries`, bold: true },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
