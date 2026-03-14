import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EmptyView from '@components/common/EmptyView';
import fetchFacilities from '@services/FacilityClient';
import { RootStackParamList } from '@navigation/types'; 
import { Facility } from '@models/Facility';
import ItemSeprator from './ItemSeparator';
import ItemView from './ItemView';

const paginate = (collection, page = 1, numItems = 10) => {
  if( !Array.isArray(collection) ) {
    throw `Expect array and got ${typeof collection}`;
  }
  const currentPage = parseInt(page);
  const perPage = parseInt(numItems);
  const offset = (page - 1) * perPage;
  const paginatedItems = collection.slice(offset, offset + perPage);

  return {
    currentPage,
    perPage,
    total: collection.length,
    totalPages: Math.ceil(collection.length / perPage),
    data: paginatedItems
  };
}

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

// const facilities = fetchFacilities()
// const data = paginate(facilities)

type ItemData = {
  item: Facility,
}

const HomeView = () => {  
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [hasError, setError] = useState(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) return;

    setIsLoadind(true);
    fetchFacilities()
      .then(result => {
        setFacilities(result);
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
  if (facilities.length === 0) return (<EmptyView text='No location found.' />);

  return (
    <View>
      <FlatList 
        data={facilities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeprator}
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
