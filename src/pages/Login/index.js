import React from 'react';

import api from '../../services/api';
import { InputContainer } from '../Search/styles';
import Input from '~/components/Input';

import {
  Container,
  Background,
  Button,
  ButtonText,
  PasswordForgetLink,
  Link,
  LogoImage
} from './styles';

export default function Login() {

  return (
    <>
      <Background>
          <LogoImage
            source={require('../../../assets/logo-charisma.png')}
          />
        <Container>
          <InputContainer>
            <Input placeholder="Email..." />
          </InputContainer>
          <InputContainer>
            <Input placeholder="Mot de passe..." rightIconName="eye" />
            <PasswordForgetLink>Mot de passe oublié ?</PasswordForgetLink>
          </InputContainer>
          <Button>
            <ButtonText>Se connecter</ButtonText>
          </Button>
          <Link>Pas encore membre ? Créer un compte</Link>
        </Container>
      </Background>
    </>
  );
}
