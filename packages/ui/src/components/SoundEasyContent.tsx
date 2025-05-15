import React from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { AudioStatusIndicator } from './AudioStatusIndicator';
import { CategoryDisplay } from './CategoryDisplay';
import { imageStructure } from '../constants/phonetic-structure';

export const SoundEasyContent: React.FC = () => {
  const {
    isLearningMode,
    startLearningMode,
    stopLearningMode,
    isLoadingAll,
    audioLoadStatus
  } = useAudioPlayer();

  // Calculate loading progress
  const totalSymbols = Object.keys(audioLoadStatus).length;
  const loadedSymbols = Object.values(audioLoadStatus).filter(status => status === 'loaded').length;
  const loadingProgress = totalSymbols > 0 ? Math.floor((loadedSymbols / totalSymbols) * 100) : 0;

  return (
    <div className="p-6 sm:p-8 bg-white font-sans max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => isLearningMode ? stopLearningMode() : startLearningMode()}
          className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200
                    ${isLoadingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingAll}
        >
          {isLearningMode ? "停止学习模式" : "开始学习模式"}
        </button>

        {isLoadingAll && (
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">加载中 {loadingProgress}%</span>
          </div>
        )}
      </div>

      <div className={"flex flex-row justify-between"}>
        <div>
          {imageStructure.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <h2 className={section.titleClass}>{section.title}</h2>
              {section.categories.map((category, categoryIndex) => {
                const categoryKey = `${section.title}-${category.name}-${categoryIndex}`;
                return (
                  <CategoryDisplay
                    key={categoryKey}
                    category={category}
                    categoryKey={categoryKey}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <img className={"h-[300px]"} src="/Phonogram.png" alt=""/>
      </div>

      <AudioStatusIndicator />
    </div>
  );
};
