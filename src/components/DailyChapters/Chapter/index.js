import React from 'react';
import {
  MaterialCommunityIcons as Icon,
  Feather,
  Ionicons,
} from '@expo/vector-icons';

import {
  Chapter,
  Header,
  Image,
  TitleContainer,
  Title,
  SubTitle,
  Description,
  Footer,
  Left,
  Time,
  Right,
  IconRight,
} from './styles';

export default function Episode({ time, chapter, onPress, onPlayPress }) {

  return (
    <Chapter onPress={onPress}>
      <Header>
        <Image
          source={{
            uri: chapter.image || chapter.previewImage,
          }}
        />
        <TitleContainer>
          <Title>{chapter.title}</Title>
          <SubTitle>{chapter.author || 'Auteur inconnu'}</SubTitle>
        </TitleContainer>
      </Header>
      <Footer>
        <Description>{chapter.description || 'Aucune description...'}</Description>
        <Time>
          {chapter.time}
        </Time>
      </Footer>
    </Chapter>
  );
}
