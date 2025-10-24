import { Features, PredictionResult, Genre, GENRES, ConfidenceScore } from '../types';

// This function creates a consistent, pseudo-random score for non-predicted genres
// based on their name, so the results are the same every time for the same inputs.
const getDeterministicLowScore = (genre: Genre): number => {
  // Simple algorithm using character codes and length to generate a consistent number
  let hash = 0;
  for (let i = 0; i < genre.length; i++) {
    hash = (hash << 5) - hash + genre.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // Bring it into a reasonable score range (e.g., 5-45)
  return (Math.abs(hash) % 41) + 5;
};


const getPredictedGenre = (features: Features): Genre => {
  const { spectralCentroidMean, tempo } = features;

  if (spectralCentroidMean > 3200 && tempo > 135) {
    // Made deterministic: always predicts 'metal' in this case
    return 'metal';
  }
  if (spectralCentroidMean > 2800 && tempo > 115) {
    return 'disco';
  }
  if (spectralCentroidMean < 2200 && tempo < 100) {
     // Made deterministic: always predicts 'classical' in this case
    return 'classical';
  }
  if (spectralCentroidMean < 2400 && tempo < 110) {
    return 'blues';
  }
  if (tempo > 120 && spectralCentroidMean < 3000) {
    return 'pop';
  }
  if (spectralCentroidMean > 2500 && spectralCentroidMean < 3200) {
      return 'hiphop';
  }
  if (tempo < 115) {
      return 'reggae';
  }
  return 'country';
};

export const simulatePrediction = (features: Features): Promise<PredictionResult> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const predictedGenre = getPredictedGenre(features);
      
      const scores: ConfidenceScore[] = GENRES.map(genre => {
        if (genre === predictedGenre) {
          // Base the high score on the input features to make it feel more responsive,
          // but still deterministic.
          const baseScore = 75;
          // Add some variation based on tempo and centroid
          const tempoBonus = Math.floor((features.tempo - 100) / 10);
          const centroidBonus = Math.floor((features.spectralCentroidMean - 2500) / 250);
          let dynamicScore = baseScore + tempoBonus + centroidBonus;
          
          // Clamp the score between 70 and 95
          const score = Math.max(70, Math.min(95, dynamicScore));
          return { genre, score };
        }
        // Use the deterministic function for all other genres
        return { genre, score: getDeterministicLowScore(genre) };
      });

      scores.sort((a, b) => b.score - a.score);

      resolve({
        predictedGenre,
        scores,
      });
    }, 1000); // 1-second delay to simulate processing
  });
};
