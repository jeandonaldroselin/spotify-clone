import React from 'react';
import { View } from 'react-native';

import Card from '../Card';
import { Container, Title, PodcastList } from './styles';

export default function PodcastsSlide({ list, isPlaceholder, onItemPress }) {
  return (
    <Container>
      {
        isPlaceholder ?
        <View style={{ backgroundColor: 'rgba(255,255,255,0.6)', width: 150, height: 13 }}></View>
        :
        <Title>{list.title}</Title>
      }
      <PodcastList>
        {list.medias &&
          list.medias.map((item, index) => <Card key={index} item={item} isPlaceholder={isPlaceholder} onPress={onItemPress} />)}
      </PodcastList>
    </Container>
  );
}
