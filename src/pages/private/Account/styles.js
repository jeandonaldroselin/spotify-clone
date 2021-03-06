import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;

export const PlayList = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
})`
  width: ${Dimensions.get('window').width - 5}px;
`;



export const Title = styled.Text`
  font-size: 29px;
  font-weight: bold;
  color: white;
  padding: 20px 10px;
`;

export const TextAvatar = styled.Text`
  fontWeight: bold;
  fontSize: 22;
  paddingLeft:15px;
  color: #eda948;
`;
