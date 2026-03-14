import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Facility } from '@models/Facility';
import EmptyView from '@components/common/EmptyView';
import fetchFacilities from '@services/FacilityClient';
import { RootStackParamList } from '@navigation/types'; 
import { COLORS, SPACING, TYPOGRAPHY } from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  
  item: {
    padding: SPACING.xl,
  },

  name: {
    fontSize: TYPOGRAPHY.sizes.heading,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle,
    color: COLORS.textSecondary,
  },
});

type ItemData = {
  item: Facility,
}

type ItemProps = { 
  item: Facility, 
  onPress: () => void,
};

const Item = ({ item, onPress }: ItemProps ) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View>
      <Text style={styles.name} >{item.name}</ Text>
      <Text style={styles.subtitle} >{item.address}</ Text>
    </View>
  </TouchableOpacity>
);

const ItemSeprator = () => <View style={{
  height: 1,
  width: "100%",
  backgroundColor: COLORS.separator,
}} />

const HomeView = () => {  
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setFacilities(fetchFacilities());
  }, []);

  const renderItem = ({ item }: ItemData) => {
    return (
      <Item
        item={item}        
        onPress={() => navigation.navigate('Facility', { facility: item }) }
      />
    );
  }

  if (facilities.length === 0) return (<EmptyView text='No location found.x' />)

  return (
    <View>
      <FlatList 
        data={facilities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeprator}
      />
    </View>
  );
}

export default HomeView;
