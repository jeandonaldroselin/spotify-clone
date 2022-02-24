import React from 'react';
import { View } from 'react-native';

import Card from '../Card';
import { Container, Title, PodcastList } from './styles';

export default function PodcastsSlide({ list, isPlaceholder, onItemPress }) {
  return (
    <Container>
      <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={isPlaceholder}
          >
        <Title>{list.title}</Title>
      </SkeletonContent>
      <PodcastList>
        {list.medias &&
          list.medias.map((item, index) => <Card key={index} item={item} isPlaceholder={isPlaceholder} onPress={onItemPress} />)}
      </PodcastList>
    </Container>
  );
}
