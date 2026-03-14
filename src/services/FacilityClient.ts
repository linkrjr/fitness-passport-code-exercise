import data from '@data/facilities.json';
import { Facility } from '@models/Facility';

const DATA = data as Facility[];

const fetchFacilities = async (): Promise<Facility[]> => {
  // simulate an api call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DATA);
      // reject("error");
    }, 1000);        
  });
}

export default fetchFacilities;