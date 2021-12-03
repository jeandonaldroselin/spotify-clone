import React from 'react';

import { Container, Title } from './styles';

export default function Albums() {
  return (
    <Container>
      <Title>Les albums que vous aimez apparaîtront ici</Title>
    </Container>
  );
}

Albums.navigationOptions = {
  tabBarLabel: 'Albums',
};
