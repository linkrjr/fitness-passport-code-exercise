import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Facility } from '@models/Facility';
import EmptyList from '@components/common/EmptyView';
import fetchFacilities from '@services/FacilityClient';
import { RootStackParamList } from '@navigation/types'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  name: {
    fontSize: 20,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#adadad',
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
  backgroundColor: "#c2c2c2",
}} />

const HomeView = () => {  
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedId, setSelectedId] = useState<string>();

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

  if (facilities.length === 0) return (<EmptyList text='No location found.x' />)

  return (
    <View>
      <FlatList 
        data={facilities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        ItemSeparatorComponent={ItemSeprator}
      />
    </View>
  );
}

export default HomeView;
