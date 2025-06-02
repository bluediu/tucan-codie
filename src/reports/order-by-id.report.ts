/* Interfaces */
import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import type { ICompleteOrder } from 'src/interfaces';

/* Helpers */
import { footerSection } from './sections/footer.section';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 10],
  },
};

interface IReportValues {
  title?: string;
  subtitle?: string;
  data: ICompleteOrder;
}

export const orderByIdReport = (
  values: IReportValues,
): TDocumentDefinitions => {
  const { data } = values;

  const { customers, order_details } = data;

  const subtotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subtotal + 1.2;

  return {
    styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      { text: 'Tucan Code', style: 'header' },
      {
        columns: [
          {
            text: '15 Montgomery Street, San Francisco, \nCA 94104\nBN: 123456234\nhttp://tucancode.com\n',
          },
          {
            text: [
              {
                text: `Recibo No. ${data.order_id}\n`,
                style: { bold: true },
              },
              `Fecha del recibo ${DateFormatter.getDDMMYYYY(data.order_date)}\nPagar antes de ${DateFormatter.getDDMMYYYY(new Date())}\n\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      { qr: 'https://devtalles.com', fit: 75, alignment: 'right' },
      {
        text: [
          { text: `Cobrar a:\n`, style: 'subHeader' },
          `Razón social: ${customers.customer_name}.\n Contacto:  ${customers.contact_name}\n`,
        ],
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Description', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((detail) => [
              detail.order_id,
              detail.products.product_name,
              detail.quantity,
              {
                text: CurrencyFormatter.format(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.format(
                  detail.quantity * +detail.products.price,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      '\n\n',
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.format(subtotal),
                    alignment: 'right',
                    bold: true,
                  },
                ],
                [
                  'Total',
                  {
                    text: CurrencyFormatter.format(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
