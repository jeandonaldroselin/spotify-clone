import React from 'react';

import {
  Container,
  ImageContainer,
  Image,
  TextContainer,
  Title,
  SubTitle,
  SubTitlex
} from './styles';
import { Linking } from 'react-native';


export default function Item({value,caption=null}) {
  return (
    <Container >
      <TextContainer>
        <Title>{value}</Title>   
        {caption !== null ?
            <SubTitle>{caption}</SubTitle> :
            null
          }
      </TextContainer>
      </Container>
  );
}
