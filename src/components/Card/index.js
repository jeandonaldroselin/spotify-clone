import React from 'react';

import {
  Container,
  PodImage,
  ContainerSubtitle,
  Subtitle,
  Description,
} from './styles';

export default function Card({ item, onPress }) {
  return (
    <Container onPress={() => onPress(item)}>
      <PodImage source={{ uri: item.previewImage }} />
      <ContainerSubtitle>
        <Subtitle>{item.title}</Subtitle>
        <Description>{item.author.fullName}</Description>
      </ContainerSubtitle>
    </Container>
  );
}
