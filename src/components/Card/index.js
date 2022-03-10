import React from 'react';

import {
  Container,
  PodImage,
  ContainerSubtitle,
  Subtitle,
  Description,
} from './styles';
import { View } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

export default function Card({ item, isPlaceholder, onPress }) {
  return (
    <Container onPress={() => onPress(item)}>
      {
        isPlaceholder ?
          <SkeletonLoader>
            <SkeletonLoader.Container style={[{ flex: 1, flexDirection: "row" }]} >
              <SkeletonLoader.Item style={{  width: 150,  height: 150 }}/>
            </SkeletonLoader.Container>
          </SkeletonLoader>
          :
          <PodImage source={{ uri: item.previewImage }} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      }
      <ContainerSubtitle>
        {
          isPlaceholder ?
            <SkeletonLoader>
                <SkeletonLoader.Container style={[{ flex: 1, flexDirection: "row" }]} >
                  <SkeletonLoader.Item style={{  width: 150,  height: 10 }}/>
                </SkeletonLoader.Container>
                <SkeletonLoader.Container style={[{ flex: 1, flexDirection: "row" }]} >
                  <SkeletonLoader.Item style={{  width: 150,  height: 10 }}/>
                </SkeletonLoader.Container>
            </SkeletonLoader>
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
