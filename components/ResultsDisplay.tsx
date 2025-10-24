
import React from 'react';
import { PredictionResult, ConfidenceScore } from '../types';

interface ResultsDisplayProps {
  prediction: PredictionResult | null;
  isLoading: boolean;
}

const ProgressBar: React.FC<{ score: ConfidenceScore; isPredicted: boolean }> = ({ score, isPredicted }) => {
  const barColor = isPredicted ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="flex items-center space-x-4">
      <span className="w-24 text-sm font-medium text-gray-300 capitalize text-right">{score.genre}</span>
      <div className="w-full bg-gray-700/50 rounded-full h-6 overflow-hidden">
        <div
          className={`h-6 rounded-full ${barColor} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${score.score}%` }}
        >
            <span className="text-xs font-bold text-white">{score.score}%</span>
        </div>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full">
            <svg className="animate-spin h-12 w-12 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-gray-300">Analyzing Audio Features...</p>
            <p className="text-gray-400">The AI is listening.</p>
        </div>
      );
    }

    if (!prediction) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl font-semibold text-gray-300">Awaiting Classification</p>
            <p className="text-gray-400">Adjust the features and press "Classify Genre" to see the results.</p>
        </div>
      );
    }
    
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-6">
            <p className="text-lg text-gray-400">Predicted Genre</p>
            <p className="text-5xl font-extrabold capitalize text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mt-1">
                {prediction.predictedGenre}
            </p>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Confidence Scores</h3>
            <div className="space-y-3">
            {prediction.scores.map((score) => (
                <ProgressBar
                key={score.genre}
                score={score}
                isPredicted={score.genre === prediction.predictedGenre}
                />
            ))}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl min-h-[400px] lg:min-h-0 flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};
