import codebartypes from './codebarTypes.json';
import { NUMBER_0, NUMBER_1 } from './globalConstants';

export const identifyBarcodeType = (codebar?: string): {
  type: string,
  id: number,
  errorMessage: string,
  keyboardType: string,
  maxLength: number
} | null => {
  const barcodeData = codebartypes;

  for (let i = barcodeData.barcodes.length - NUMBER_1; i >= NUMBER_0; i--) {
    const barcode = barcodeData.barcodes[i];
    const regex = new RegExp(barcode.regex);

    if (!codebar) return null;
    if (regex.test(codebar)) {
      return {
        type: barcode.type,
        id: barcode.id,
        errorMessage: barcode.errorMessage,
        keyboardType: barcode.keyboardType,
        maxLength: barcode.maxLength,
      };
    }
  }
  return null;
};
