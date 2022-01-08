import React, { useState } from 'react';

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
import { Linking } from 'react-native';

export default function Login({navigation}) {
  const passwordForgotLink = 'https://www.editions-charisma.fr/mot-de-passe-oublie';
  const createAccountLink = 'https://www.editions-charisma.fr/authentification?create_account=1';
  const [showPassword, setShowPassword] = useState(false);

  const onConnectButtonPress = () => {
    // TODO login logic

    navigation.navigate('App');
  }

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
            <Input placeholder="Mot de passe..." rightIconName="eye" secureTextEntry={!showPassword} onRightIconPress={() => setShowPassword(!showPassword)}/>
            <PasswordForgetLink onPress={() => Linking.openURL(passwordForgotLink)}>Mot de passe oublié ?</PasswordForgetLink>
          </InputContainer>
          <Button onPress={onConnectButtonPress}>
            <ButtonText>Se connecter</ButtonText>
          </Button>
          <Link onPress={() => Linking.openURL(createAccountLink)}>Pas encore membre ? Créer un compte</Link>
        </Container>
      </Background>
    </>
  );
}
