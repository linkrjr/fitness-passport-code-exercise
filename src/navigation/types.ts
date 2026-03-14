import { Facility } from '@models/Facility';

export type RootStackParamList = {
  Locations: undefined,
  Facility: { facility: Facility };
};
