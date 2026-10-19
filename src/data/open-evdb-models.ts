import type { EVModel } from '../types/vehicle';
import rawOpenEvdbData from './open-evdb-models.json';

export const OPEN_EVDB_MODELS: EVModel[] = rawOpenEvdbData as EVModel[];
