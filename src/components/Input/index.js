import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Container, TextInput } from './styles';

export default function Input({ placeholder, leftIconName, rightIconName }) {
  return (
    <Container>
      <Feather
        name={leftIconName}
        size={24}
        color="#111"
        style={{ fontWeight: 'normal' }}
      />
      <TextInput placeholder={placeholder} placeholderTextColor="#000" />
      <Feather
        name={rightIconName}
        size={24}
        color="#111"
        style={{ fontWeight: 'normal', paddingRight: 20 }}
      />
    </Container>
  );
}
