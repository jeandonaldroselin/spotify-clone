import React from 'react';
import { View } from 'react-native';

import Card from '../Card';
import { Container, Title, PodcastList } from './styles';
import SkeletonLoader from "expo-skeleton-loader";


export default function PodcastsSlide({ list, isPlaceholder, onItemPress }) {
  return (
    <Container>
      {
        isPlaceholder ?
          <SkeletonLoader>
            <SkeletonLoader.Container
              style={[{ flex: 1, flexDirection: "row" }]}
            >
              <SkeletonLoader.Item
                style={{
                  width: 150,
                  height: 13,
                }}
              />
            </SkeletonLoader.Container>
          </SkeletonLoader>
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
