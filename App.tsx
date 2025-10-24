
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ClassifierControls } from './components/ClassifierControls';
import { ResultsDisplay } from './components/ResultsDisplay';
import { About } from './components/About';
import { Features, PredictionResult, DemoGenre } from './types';
import { simulatePrediction } from './services/classificationService';
import { DEMO_GENRES, DEFAULT_FEATURES } from './constants';

const App: React.FC = () => {
  const [features, setFeatures] = useState<Features>(DEFAULT_FEATURES);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFeatureChange = useCallback((feature: keyof Features, value: number) => {
    setFeatures(prev => ({ ...prev, [feature]: value }));
  }, []);

  const handleClassify = useCallback(async () => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await simulatePrediction(features);
      setPrediction(result);
    } catch (error) {
      console.error("Classification failed:", error);
      // Optionally set an error state here to show in the UI
    } finally {
      setIsLoading(false);
    }
  }, [features]);

  const handleDemoSelect = useCallback((demo: DemoGenre) => {
    setFeatures(DEMO_GENRES[demo]);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ClassifierControls
            features={features}
            onFeatureChange={handleFeatureChange}
            onClassify={handleClassify}
            onDemoSelect={handleDemoSelect}
            isLoading={isLoading}
          />
          <ResultsDisplay prediction={prediction} isLoading={isLoading} />
        </main>
        <About />
      </div>
    </div>
  );
};

export default App;
