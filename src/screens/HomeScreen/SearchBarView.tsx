import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBarView = React.memo<SearchBarProps>(({ value, onChangeText }) => {
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

export default SearchBarView;