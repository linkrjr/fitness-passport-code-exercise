import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import { COLORS, SPACING } from '@styles/theme';
import { createShadow } from '@utils/shadow';
import MapView, { Marker } from 'react-native-maps';

import FacilityListView from './FacilityListView';
import { Facility } from '@models/Facility';
import { RootStackParamList } from '@navigation/types';
import { RouteProp } from '@react-navigation/native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    ...createShadow(4),
  },

  map: {
    width: '100%',
    height: '70%',
  },

  content: {
    padding: SPACING.md,
  },

  name: {
    fontSize: 20,
    color: "#000000",
  },
  address: {
    fontSize: 14,
    color: "#3c3c3c",
  },
  facilities: {},
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
    <View style={styles.card}>
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
  )
}

export default FacilityView;