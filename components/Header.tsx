
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
      Music Genre Classifier
    </h1>
    <p className="mt-3 text-lg sm:text-xl text-blue-200/80 max-w-2xl mx-auto">
      AI-Powered Genre Detection Using Audio Features
    </p>
    <p className="mt-2 text-sm text-gray-400 max-w-3xl mx-auto">
      This interface simulates a machine learning model that classifies music genres. Adjust the audio feature sliders below and see the AI's prediction in real-time.
    </p>
  </header>
);
