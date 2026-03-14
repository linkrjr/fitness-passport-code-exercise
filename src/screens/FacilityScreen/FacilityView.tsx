import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@styles/theme';
import MapView, { Marker } from 'react-native-maps';
import FacilityListView from './FacilityListView';
import { Facility } from '@models/Facility';
import { RootStackParamList } from '@navigation/types';
import { RouteProp } from '@react-navigation/native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
  },

  map: {
    width: '100%',
    height: '70%',
  },

  content: {
    borderColor: 'block',
    padding: SPACING.xl,
  },

  name: {
    fontSize: TYPOGRAPHY.sizes.heading,
    color: COLORS.text,
  },

  address: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textSecondary,
  },
});

type FacilityListViewProps = {
  route: RouteProp<RootStackParamList, 'Facility'>;
}

const FacilityView: React.FC<FacilityListViewProps> = ({ route }) => {
  const selectedFacility = route.params.facility as Facility;
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!mapRef.current || !selectedFacility.location) return;
    mapRef.current?.animateCamera({
      zoom: 15,
      center: selectedFacility.location,
    }); 
  }, []);

  return (
    <ScrollView style={styles.card}>
      <View>
        <MapView 
          initialRegion={
            {
              latitudeDelta: 0.01, 
              longitudeDelta: 0.01, 
              ...selectedFacility.location
            }
          } 
          ref={mapRef} 
          style={styles.map} 
          rotateEnabled={false}
        >
          <Marker coordinate={selectedFacility.location} />
        </MapView>
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{selectedFacility.name}</Text>
          </View>
          <View>
            <Text>{selectedFacility.address}</Text>
          </View>
          <FacilityListView facilities={selectedFacility.facilities} />
        </View>
      </View> 
    </ScrollView>

  )
}

export default FacilityView;