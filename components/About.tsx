
import React from 'react';
import { GENRES } from '../types';

const FeatureDescription: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="font-bold text-blue-300">{title}</h4>
    <p className="text-sm text-gray-400">{children}</p>
  </div>
);

export const About: React.FC = () => (
  <div className="mt-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
    <h2 className="text-2xl font-bold text-gray-100 mb-4">About This Project</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Feature Explanations</h3>
        <FeatureDescription title="🎼 Spectral Centroid Mean">
          Indicates the 'center of mass' of the sound spectrum. A higher value corresponds to a 'brighter' sound with more high-frequency content (e.g., cymbals in metal music).
        </FeatureDescription>
        <FeatureDescription title="🥁 Tempo (BPM)">
          The speed or pace of a given piece, measured in beats per minute. High tempo is common in genres like disco and rock, while classical music often has a lower tempo.
        </FeatureDescription>
        <FeatureDescription title="🔊 Rolloff Mean">
          Represents the frequency below which a certain percentage of the total spectral energy lies. It's another measure of the sound's 'brightness'.
        </FeatureDescription>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Model Performance</h3>
          <p className="text-sm text-gray-400">
            This demo is based on a Random Forest model trained on the GTZAN dataset, achieving <span className="font-bold text-green-400">77% accuracy</span>.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">10 Supported Genres</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {GENRES.map(genre => (
              <span key={genre} className="capitalize text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
