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

export default function Item({name,value=null,url=null}) {

  return (
    
    <Container onPress={() => url ? Linking.openURL(url) : null}>
      <TextContainer>
        <Title>{name}</Title>   
        {value !== null ?
            <SubTitle>{value}</SubTitle> :
            null
          }
        
      </TextContainer>
      </Container>
 
    

  );
}
