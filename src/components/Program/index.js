import React from 'react';

import {
  Container,
  ImageContainer,
  Image,
  TextContainer,
  Title,
  SubTitle,
} from './styles';

export default function Program({ program, onPress }) {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image source={{ uri: program.previewImage }} />
      </ImageContainer>
      <TextContainer>
        <Title>{program.title}</Title>
        <SubTitle>
          {program.releaseDate} - {program.author.fullName}
        </SubTitle>
      </TextContainer>
    </Container>
  );
}
