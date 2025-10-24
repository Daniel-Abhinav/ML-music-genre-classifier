
import { Features, DemoGenre } from './types';
import type { Record } from 'typescript-utilities';

export const DEFAULT_FEATURES: Features = {
  spectralCentroidMean: 2500,
  tempo: 120,
  rolloffMean: 4500,
};

export const DEMO_GENRES: Record<DemoGenre, Features> = {
  Classical: { spectralCentroidMean: 1800, tempo: 85, rolloffMean: 3500 },
  Metal: { spectralCentroidMean: 3800, tempo: 150, rolloffMean: 6000 },
  Blues: { spectralCentroidMean: 2100, tempo: 95, rolloffMean: 4200 },
  Disco: { spectralCentroidMean: 3000, tempo: 125, rolloffMean: 5500 },
};
