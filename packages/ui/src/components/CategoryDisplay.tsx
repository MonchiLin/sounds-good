import React from 'react';
import { CategoryStructure } from '../types';
import { PhoneticSymbol } from './PhoneticSymbol';
import { findSymbolData } from '../utils/phonetic-utils';

interface CategoryDisplayProps {
  category: CategoryStructure;
  categoryKey: string;
}

export const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ category, categoryKey }) => {
  return (
    <div className="flex items-baseline mb-3">
      <span className="w-32 text-lg text-gray-700 shrink-0">
        {category.name}
      </span>
      <div className="flex items-baseline text-xl text-gray-800">
        <span className="text-gray-600 select-none">/</span>
        <div className="flex flex-wrap items-baseline space-x-1 mx-1">
          {category.symbols.map((symbolChar, symbolIndex) => {
            const symbolData = findSymbolData(symbolChar);
            const symbolKey = `${categoryKey}-${symbolChar}-${symbolIndex}`;
            
            return (
              <PhoneticSymbol
                key={symbolKey}
                symbol={symbolData.symbol}
                audioFile={symbolData.audioFile}
              />
            );
          })}
        </div>
        <span className="text-gray-600 select-none">/</span>
      </div>
    </div>
  );
};
