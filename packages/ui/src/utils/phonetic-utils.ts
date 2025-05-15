import { phoneticData } from "../constants/phonetic-data";
import { imageStructure } from "../constants/phonetic-structure";
import { PhoneticSymbolData } from "../types";

/**
 * Finds detailed symbol data from phoneticData based on the symbol character
 */
export const findSymbolData = (symbolChar: string): PhoneticSymbolData => {
  // First check if the symbol exists in the imageStructure
  for (const section of imageStructure) {
    for (const category of section.categories) {
      if (category.symbols.includes(symbolChar)) {
        // Now find the detailed data from phoneticData
        for (const pdCategoryKey in phoneticData) {
          const pdCategory = phoneticData[pdCategoryKey];
          if (pdCategory && pdCategory.symbols) {
            const found = pdCategory.symbols.find(s => s.symbol === symbolChar);
            if (found) return found;
          }
        }
      }
    }
  }

  // Fallback if not found in phoneticData but present in imageStructure (e.g. no audio)
  return { symbol: symbolChar, audioFile: null };
};

/**
 * Gets all phonetic symbols from the structure
 */
export const getAllSymbols = (): PhoneticSymbolData[] => {
  const allSymbols: PhoneticSymbolData[] = [];

  for (const section of imageStructure) {
    for (const category of section.categories) {
      for (const symbol of category.symbols) {
        const symbolData = findSymbolData(symbol);
        allSymbols.push(symbolData || { symbol, audioFile: null });
      }
    }
  }

  return allSymbols;
};
