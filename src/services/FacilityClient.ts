import data from '@data/facilities.json';
import { Facility } from '@models/Facility';

const DATA = data as Facility[];

const fetchFacilities = (): Facility[] => {
  return DATA;
}

export default fetchFacilities;