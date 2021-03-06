import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Container, TextInput } from './styles';

export default function Input({ placeholder, leftIconName, rightIconName, secureTextEntry, onRightIconPress, onChangeText }) {
  return (
    <Container>
      <Feather
        name={leftIconName}
        size={24}
        color="#111"
        style={{ fontWeight: 'normal' }}
      />
      <TextInput placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor="#000" secureTextEntry={secureTextEntry}/>
      <Feather
        name={rightIconName}
        size={24}
        color="#111"
        style={{ fontWeight: 'normal', paddingRight: 20 }}
        onPress={onRightIconPress}
      />
    </Container>
  );
}
