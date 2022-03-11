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

// Style page album/coffret

export const ImageContainer = styled.View`
  height: 40%;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
  margin-top:20px;
  background-color: #272829;
  border-radius:5px;
`;

export const Image = styled.Image`
  height: 100%;
  width: 100%;
  border-radius:5px
`;

export const TitleContainer = styled.View`
  margin-left: 25px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: white;
  font-weight: bold;
  width: 80%;
  font-size: 23px;
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

export const Arrow = styled.Text.attrs({})`
  margin-top:20px
  margin-left:10px
`;

// Style page auteur
export const ImageContainerAuthor = styled.View`
  height: 43%;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  border-radius:160px;
`;

export const ImageAuthor = styled.Image`
  height: 89%;
  width: 90%;
  border-radius:160px
`;

export const TitleContainerAuthor = styled.View`
  margin-left: 25px;
  margin-bottom: 10px;
  margin-top:-10px
`;

export const TitleAuthor = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: white;
  font-weight: bold;
  width: 80%;
  font-size: 23px;
`;

export const SubTitleAuthor = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: #999;
  font-weight: bold;
  font-size: 12px;
  margin-top: 5px;
  width: 75%;
`;