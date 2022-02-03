import React from 'react';

import Card from '../Card';
import { Container, Title, PodcastList } from './styles';

export default function PodcastsSlide({ list, onItemPress }) {
  return (
    <Container>
      <Title>{list.title}</Title>
      <PodcastList>
        {list.medias &&
          list.medias.map((item, index) => <Card key={index} item={item} onPress={onItemPress} />)}
      </PodcastList>
    </Container>
  );
}
