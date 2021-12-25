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

export default function Item({name,value}) {
  return (
    
    <Container>
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
