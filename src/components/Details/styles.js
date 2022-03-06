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

export const ImageContainer = styled.View`
  height: 46%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top:10px;
  background-color: #272829;
  align-items: center;
  justify-content: center;
  border-radius:5px;

`;

export const Image = styled.Image`
  height: 100%;
  width: 100%;
  border-radius:5px
`;

export const TitleContainer = styled.View`
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: white;
  font-weight: bold;
  width: 80%;
  font-size: 25px;
`;

export const SubTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: #999;
  font-weight: bold;
  font-size: 12px;
  margin-top: 5px;
  width: 75%;
`;
