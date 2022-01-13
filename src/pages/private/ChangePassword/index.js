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
  ErrorMessage
} from './styles';
import { Linking, Text } from 'react-native';
import { AuthenticationContext } from '~/context/authentication.context';

export default ChangePassword = ({props}) => {
  const { accessToken } = useContext(AuthenticationContext);
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const [passwordActualText, setPasswordActualText] = useState("");
  const [passwordNewText, setPasswordNewText] = useState("");
  const [passwordConfirmationText, setPasswordConfirmationText] = useState("");

  // Form errors
  const [isPasswordActualValid, setIsPasswordActualValid] = useState(false);
  const [isPasswordNewValid, setIsPasswordNewValid] = useState(false);
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(false);

//     const isValidForm = [isFieldEmpty(passwordActualText), isFieldEmpty(passwordNewText), isFieldEmpty(passwordConfirmationText)].every(v => v === false);
//      let body = { currentPassword: passwordActualText, plainPassword: { first: passwordNewText, second: passwordConfirmationText }};


   onPasswordActualFieldChange = value => {
    setIsPasswordActualValid(isFieldEmpty(value));
    setPasswordActualText(value);
  };

   onPasswordNewChange = value => {
    setPasswordNewText(value);
    setIsPasswordNewValid(isFieldEmpty(value))
  };

   onPasswordConfirmationChange = value => {
    setPasswordConfirmationText(value);
    setIsPasswordConfirmationValid(isFieldEmpty(value))
  };

   isFieldEmpty = field => {
    return !(field === "" || field === undefined || field === null);
  };

  return (
    <>
      <Background>
        <Container>
          <InputContainer>
            <Input placeholder="Mot de passe Actuel..."
              rightIconName={!showPasswordActual ? 'eye' : 'eye-off'}
              secureTextEntry={!showPasswordActual}
              onRightIconPress={() => setShowPasswordActual(!showPasswordActual)}
              onChangeText={onPasswordActualFieldChange}
            />
            {isPasswordActualValid && (<ErrorMessage>Ce champ est obligatoire</ErrorMessage>)}
          </InputContainer>

          <InputContainer>
            <Input placeholder="Nouveau mot de passe..."
              rightIconName={!showPasswordNew ? 'eye' : 'eye-off'}
              secureTextEntry={!showPasswordNew}
              onRightIconPress={() => setShowPasswordNew(!showPasswordNew)}
              onChangeText={onPasswordNewChange}
            />
            {isPasswordNewValid && (<ErrorMessage>Ce champ est obligatoire</ErrorMessage>)}
          </InputContainer>

          <InputContainer>
            <Input placeholder="Confirmez mot de passe ..."
              rightIconName={!showPasswordConfirmation ? 'eye' : 'eye-off'}
              secureTextEntry={!showPasswordConfirmation}
              onRightIconPress={() => onPasswordConfirmationChange(!showPasswordConfirmation)}
              onChangeText={onPasswordConfirmationChange}
            />
            {isPasswordConfirmationValid && (<ErrorMessage>Ce champ est obligatoire</ErrorMessage>)}
          </InputContainer>
          <Button onPress={null}>
            <ButtonText>Se connecter</ButtonText>
          </Button>
        </Container>
      </Background>
    </>
  );
}
