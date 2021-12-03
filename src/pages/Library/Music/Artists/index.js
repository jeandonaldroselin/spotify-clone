import React from 'react';

import { Container, Title, Button, ButtonText } from './styles';

export default function Artists() {
  return (
    <Container>
      <Title>Les artistes que vous suivez apparaîtront ici</Title>
      <Button>
        <ButtonText>Choisissez des artistes</ButtonText>
      </Button>
    </Container>
  );
}

Artists.navigationOptions = {
  tabBarLabel: 'Artistes',
};
