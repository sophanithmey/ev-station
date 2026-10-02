export {
  type ProvincePathData,
  CAMBODIA_PROVINCE_PATHS,
} from '../../../data/cambodia-province-paths';
import { CAMBODIA_PROVINCE_PATHS, type ProvincePathData } from '../../../data/cambodia-province-paths';

export const PROVINCE_PATH_MAP = new Map<string, ProvincePathData>(
  CAMBODIA_PROVINCE_PATHS.map((p) => [p.id, p]),
);
