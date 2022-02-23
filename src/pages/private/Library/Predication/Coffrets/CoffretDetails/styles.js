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

export const AudioList = styled.ScrollView``;

export const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #aaa;
  margin: 10px 15px 5px;
`;