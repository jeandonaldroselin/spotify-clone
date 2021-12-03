import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, Title, SubTitle, Button, ButtonText } from './styles';

export default function Downloads() {
  return (
    <Container>
      <Title>Aucun téléchargement pour le moment</Title>
      <SubTitle>
        Cliquez sur <Feather name="arrow-down-circle" size={15} color="#ccc" /> dans
        une prédication pour l'écouter hors connexion
      </SubTitle>
      <Button>
        <ButtonText>Explorer les prédications</ButtonText>
      </Button>
    </Container>
  );
}

Downloads.navigationOptions = {
  tabBarLabel: 'Télécharger',
};

