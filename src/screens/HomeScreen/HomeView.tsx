import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EmptyView from '@components/common/EmptyView';
import fetchFacilities from '@services/FacilityClient';
import { RootStackParamList } from '@navigation/types'; 
import { Facility } from '@models/Facility';
import ItemSeprator from './ItemSeparator';
import ItemView from './ItemView';
import filter from 'lodash.filter';
import SearchBarView from './SearchBarView';

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

type ItemData = {
  item: Facility,
}

const HomeView = () => {  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [hasError, setError] = useState(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  const [facilities, setFacilities] = useState<Facility[]>([]);  
  const [fullData, setFullData] = useState<Facility[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    
    const formattedQuery = searchText.toLowerCase();
    const filteredData = filter(fullData, facility => {
      return facility.name.toLocaleLowerCase().includes(formattedQuery);
    });
    
    setFacilities(filteredData);    

  }, [searchText]);

  useEffect(() => {
    if (isLoading) return;

    setIsLoadind(true);

    fetchFacilities()
      .then(result => {
        setFacilities(result);
        setFullData(result)
        setIsLoadind(false);
      })
      .catch(err => {
        setIsLoadind(false);
        setError(err);
      });

  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFacilities()
      .then(result => {
        setRefreshing(false);
        setFacilities(result);        
      })
      .catch(err => {
        setRefreshing(false);
        setError(err);
      });
  }
  
  const renderItem = ({ item }: ItemData) => {
    return (
      <ItemView
        item={item}        
        onPress={() => navigation.navigate('Facility', { facility: item }) }
      />
    );
  }

  if (isLoading) return (<LoadingIndicator />)
  if (!!hasError) return (<EmptyView text='Fail to load locations.' />);

  return (
    <View style={{ flex: 1 }}>
      <FlashList 
        ListHeaderComponent={<SearchBarView value={searchText} onChangeText={setSearchText} />}
        data={facilities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeprator}
        ListEmptyComponent={<EmptyView text='No location found.' />}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#000000']}
            tintColor='#000000'
          />
        }
      />
    </View>
  );
}

export default HomeView;
