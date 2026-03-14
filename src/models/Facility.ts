import { Location } from '@models/Location';

export type Facility = {
  id: string,
  name: string, 
  address: string,
  location: Location,
  facilities: string[],
}