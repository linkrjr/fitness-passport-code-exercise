import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EmptyView from '@components/common/EmptyView';
import fetchFacilities from '@services/FacilityClient';
import { RootStackParamList } from '@navigation/types'; 
import { Facility } from '@models/Facility';
import ItemSeprator from './ItemSeparator';
import ItemView from './ItemView';
import filter from 'lodash.filter';
import debounce from 'lodash.debounce';

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

type ItemData = {
  item: Facility,
}

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = React.memo<SearchBarProps>(({ value, onChangeText }) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20
      }}
    >
      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
      />
    </View>
  );
});

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
    <View>
      <FlatList 
        ListHeaderComponent={<SearchBar value={searchText} onChangeText={setSearchText} />}
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
