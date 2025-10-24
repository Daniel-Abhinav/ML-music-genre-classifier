
import React from 'react';
import { Features, DemoGenre } from '../types';
import { InputSlider } from './InputSlider';

interface ClassifierControlsProps {
  features: Features;
  isLoading: boolean;
  onFeatureChange: (feature: keyof Features, value: number) => void;
  onClassify: () => void;
  onDemoSelect: (demo: DemoGenre) => void;
}

const DemoButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full text-sm px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md hover:bg-gray-600/50 transition-colors duration-200"
  >
    {children}
  </button>
);

export const ClassifierControls: React.FC<ClassifierControlsProps> = ({
  features,
  isLoading,
  onFeatureChange,
  onClassify,
  onDemoSelect,
}) => {
  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Input Audio Features</h2>

      <div className="space-y-6">
        <InputSlider
          label="Spectral Centroid Mean"
          icon="🎼"
          min={1000}
          max={5000}
          step={10}
          value={features.spectralCentroidMean}
          onChange={(e) => onFeatureChange('spectralCentroidMean', Number(e.target.value))}
        />
        <InputSlider
          label="Tempo (BPM)"
          icon="🥁"
          min={60}
          max={200}
          step={1}
          value={features.tempo}
          onChange={(e) => onFeatureChange('tempo', Number(e.target.value))}
        />
        <InputSlider
          label="Rolloff Mean"
          icon="🔊"
          min={2000}
          max={7000}
          step={10}
          value={features.rolloffMean}
          onChange={(e) => onFeatureChange('rolloffMean', Number(e.target.value))}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Try Example Genres</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <DemoButton onClick={() => onDemoSelect('Classical')}>Classical</DemoButton>
          <DemoButton onClick={() => onDemoSelect('Metal')}>Metal</DemoButton>
          <DemoButton onClick={() => onDemoSelect('Blues')}>Blues</DemoButton>
          <DemoButton onClick={() => onDemoSelect('Disco')}>Disco</DemoButton>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={onClassify}
          disabled={isLoading}
          className="w-full py-3 px-6 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Classifying...
            </>
          ) : (
            'Classify Genre'
          )}
        </button>
      </div>
    </div>
  );
};
