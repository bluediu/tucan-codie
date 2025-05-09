import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface IReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  opts: IReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Hola Mundo ${opts.name}`],
  };

  return docDefinition;
};
