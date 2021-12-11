import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Container, Left, Right, Image, NameContainer, Name } from './styles';

export default function MiniPlayer() {
  return (
    <Container>
      <Left>
        <Image
          source={{
            uri:
              'https://i.scdn.co/image/9b225b3d47d9f0a152309ae9ac7050b1370fff4d',
          }}
        />
        <NameContainer>
          <Name>Femmes Devenez Intelligentes !</Name>
          <Name>Natalie Pedro</Name>
        </NameContainer>
      </Left>
      <Right>
        <MaterialIcons
          name="favorite-outline"
          color="white"
          size={26}
          style={{ width: 30, marginRight: 10 }}
        />
        <MaterialIcons
          name="play-arrow"
          color="white"
          size={30}
          style={{ width: 30, marginRight: 10 }}
        />
      </Right>
    </Container>
  );
}
