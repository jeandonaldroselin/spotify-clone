import React from 'react';

import {
  Container,
  PodImage,
  ContainerSubtitle,
  Subtitle,
  Description,
} from './styles';
import { View } from "react-native";
import { Title } from "../PodcastsSlide/styles";
import SkeletonContent from 'react-native-skeleton-content';

export default function Card({ item, isPlaceholder, onPress }) {
  return (
    <Container onPress={() => onPress(item)}>
      <PodImage source={{ uri: item.previewImage }} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <ContainerSubtitle>
        {
          <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={isPlaceholder}
          >
            <>
              <Subtitle>{item.title}</Subtitle>
              <Description>{item.author.fullName}</Description>
            </>
          </SkeletonContent>
        }
      </ContainerSubtitle>
    </Container>
  );
}
