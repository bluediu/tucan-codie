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
  const headerDate: Content = showDate
    ? {
        text: `${DateFormatter.getDDMMYYYY(new Date())}`,
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? { text: title, style: { bold: true, alignment: 'center' } }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
