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

export default function Episode({ time, chapter, onPress }) {
  return (
    <Chapter onPress={onPress}>
      <Header>
        <Image
          source={{
            uri: chapter.image,
          }}
        />
        <TitleContainer>
          <Title>{chapter.title}</Title>
          <SubTitle>{chapter.author}</SubTitle>
        </TitleContainer>
        <Icon
          name="dots-horizontal"
          color="#ccc"
          size={24}
          style={{ flex: 1, marginTop: 20 }}
        />
      </Header>
      <Description>{chapter.description}</Description>
      <Footer>
        <Left>
          <Ionicons name="ios-play-circle" size={35} color="#eda948" />
          <Time>
            {chapter.time}
          </Time>
        </Left>
        <Right>
          <Feather name="check" size={28} color="#999" />
          <IconRight>
            <Feather name="arrow-down-circle" size={28} color="#999" />
          </IconRight>
        </Right>
      </Footer>
    </Chapter>
  );
}
