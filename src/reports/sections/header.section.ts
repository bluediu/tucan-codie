/* Interfaces */
import { Content } from 'pdfmake/interfaces';

/* Helpers */
import { DateFormatter } from 'src/helpers';

interface IHeaderOpts {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const currentData: Content = {
  text: `${DateFormatter.getDDMMYYYY(new Date())}`,
  alignment: 'right',
  margin: [20, 30],
  width: 150,
};

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (opts: IHeaderOpts): Content => {
  const { title, subtitle, showLogo, showDate } = opts;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentData : null;

  const headerSubtitle: Content = title
    ? {
        stack: [
          {
            text: subtitle,
            alignment: 'center',
            margin: [0, 2, 0, 0],
            style: {
              fontSize: 16,
              bold: true,
            },
          },
        ],
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              fontSize: 22,
              bold: true,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
