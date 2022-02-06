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

export default function Card({ item, isPlaceholder, onPress }) {
  return (
    <Container onPress={() => onPress(item)}>
      <PodImage source={{ uri: item.previewImage }} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <ContainerSubtitle>
        {
          isPlaceholder ?
            <>
              <Subtitle><View style={{ backgroundColor: 'rgba(255,255,255,0.6)', width: 150, height: 10 }}></View></Subtitle>
              <Description><View style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 150, height: 10 }}></View></Description>
            </>
            :
            <>
              <Subtitle>{item.title}</Subtitle>
              <Description>{item.author.fullName}</Description>
            </>
        }
      </ContainerSubtitle>
    </Container>
  );
}
