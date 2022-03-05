import React from 'react';

import {
  Container,
  ImageContainer,
  Image,
  TextContainer,
  Title,
  SubTitle,
} from './styles';
import SkeletonLoader from "expo-skeleton-loader";

export default function Program({ program, onPress, isPlaceholder }) {
  return (
    <>{
      isPlaceholder ?
      <SkeletonLoader style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 15,
            height: 70,
            width: '100%'
        }}>
            <SkeletonLoader.Container style={{ 
              height: 65,
              width: 65,
              backgroundColor: '#272829',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
                <SkeletonLoader.Item style={{ width: 65,  height: 65 }}/>
            </SkeletonLoader.Container>

            <SkeletonLoader.Container style={{
              justifyContent: 'center',
              width: '100%'
            }}>
                <SkeletonLoader.Item style={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                    marginBottom: 2,
                    width: '80%',
                    height: 15
                 }}/>
                 <SkeletonLoader.Item style={{ 
                    color: '#999',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 15,
                    marginTop: 5,
                    width: '75%',
                    height: 15
                  }}/>
            </SkeletonLoader.Container>

      </SkeletonLoader>
      :
      <Container onPress={onPress}>
        <ImageContainer>
          <Image source={{ uri: program.previewImage || program.image }} />
        </ImageContainer>
        <TextContainer>
          <Title>{program.title}</Title>
          <SubTitle>
            {program.releaseDate} - {program.author?.fullName || "Auteur inconnu"}
          </SubTitle>
        </TextContainer>
      </Container>
    }
    </>
  );
}
