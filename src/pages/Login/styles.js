import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Background = styled.View`
  background-color: #121212;
  flex: 1;
  width: auto;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  position:absolute;
  width:100%;
  height:100%;
`;

export const InputContainer = styled.View`
  background-color: #121212;
  padding: 10px 0;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 25px;
  background-color: #fff;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
  padding: 15px 0;
  letter-spacing: 1px;
`;

export const PasswordForgetLink = styled.Text`
  font-weight: bold;
  text-align: right;
  font-size: 15px;
  color: white;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 20px;
`;
export const Link = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 15px;
  color: white;
  margin-top: 30px;
`;

export const LogoImage = styled.Image`
  width: 125px;
  height: 125px;
  align-self: center;
  margin-top:50
`;