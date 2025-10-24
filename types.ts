
export const GENRES = [
  "blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"
] as const;

export type Genre = typeof GENRES[number];

export interface Features {
  spectralCentroidMean: number;
  tempo: number;
  rolloffMean: number;
}

export interface ConfidenceScore {
  genre: Genre;
  score: number;
}

export interface PredictionResult {
  predictedGenre: Genre;
  scores: ConfidenceScore[];
}

export type DemoGenre = 'Classical' | 'Metal' | 'Blues' | 'Disco';
