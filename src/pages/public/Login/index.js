import React, { useContext, useState } from 'react';
import api from '../../../services/api';
import { InputContainer } from '../../private/Search/styles';
import Input from '~/components/Input';

import {
  Container,
  Background,
  Button,
  ButtonText,
  PasswordForgetLink,
  Link,
  LogoImage,
  ErrorMessage
} from './styles';
import { Linking } from 'react-native';
import { AuthenticationContext } from '~/context/authentication.context';

export default function Login({ navigation }) {
  const passwordForgotLink = 'https://www.editions-charisma.fr/mot-de-passe-oublie';
  const createAccountLink = 'https://www.editions-charisma.fr/authentification?create_account=1';
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated, setAccessToken, setRefreshToken } = useContext(AuthenticationContext);

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  // Form errors
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  const onConnectButtonPress = () => {
    const isEmailEmpty = isFieldEmpty(emailText);
    const isPasswordEmpty = isFieldEmpty(passwordText);
    const isValidForm = [isEmailEmpty, isPasswordEmpty].every((v) => v === false);
    setIsEmailRequired(isEmailEmpty);
    setIsPasswordRequired(isPasswordEmpty);
    if (isValidForm) {
      let body = {
        "email": emailText,
        "password": passwordText
      };
      api.post('/login', JSON.stringify(body)).then(response => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setIsAuthenticated(true);
        console.info('accessToken: ', response.data.accessToken)
        navigation.navigate('App');
      }).catch(e => {
        console.error(e);
      })
    }
  }

  const onEmailFieldChange = (value) => {
    setIsEmailRequired(isFieldEmpty(value));
    setEmailText(value);
  }

  const onPasswordFieldChange = (value) => {
    setIsPasswordRequired(isFieldEmpty(value));
    setPasswordText(value);
  }

  const isFieldEmpty = (field) => {
    return field === "" || field === undefined || field === null;
  }

  return (
    <>
      <Background>
        <LogoImage
          source={require('../../../../assets/logo-charisma.png')}
        />
        <Container>
          <InputContainer>
            <Input placeholder="Email..."
              onChangeText={onEmailFieldChange}
            />
            {isEmailRequired && (<ErrorMessage>Ce champ est obligatoire</ErrorMessage>)}
          </InputContainer>
          <InputContainer>
            <Input placeholder="Mot de passe..."
              rightIconName={!showPassword ? 'eye' : 'eye-off'}
              secureTextEntry={!showPassword}
              onRightIconPress={() => setShowPassword(!showPassword)}
              onChangeText={onPasswordFieldChange}
            />
            {isPasswordRequired && (<ErrorMessage>Ce champ est obligatoire</ErrorMessage>)}
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
