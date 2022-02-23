import React, { useState, useEffect } from 'react';
import { Container, AudioList, Title } from './styles';

export default function CoffretDetails() {
  const onCoffretItemPress = (media) => {
    setCurrentPlaylist(currentCoffret.items, media.track - 1);
  }
  return (
    <Container>
      <AudioList>
         <Title>test</Title>
       </AudioList>
    </Container>
  );
}
