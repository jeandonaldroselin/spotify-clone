import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1px 15px 5px;
  width: 100%;
  margin: 15px 0;
`;


export const TextContainer = styled.View`
  justify-content: center;
  width: 100%;
  height:17px;
  

`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: white;
  font-weight: bold;
  margin-left: 10px;
  width: 90%;
  font-size: 14.5px;

`;

export const SubTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: #999;
  font-weight: bold;
  font-size: 12px;
  margin-left: 10px;
  width: 75%;
  margin-top:1px
`;
