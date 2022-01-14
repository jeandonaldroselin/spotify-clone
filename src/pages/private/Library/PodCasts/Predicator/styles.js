import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 10px 10px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Predicator = styled.TouchableOpacity`
  margin-bottom: 30px;
  width: 130px;
  height: 130px;
  flex-direction: column;
`;

export const PredicatorName = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

export const PredicatorImage = styled.Image`
  background-color: #fff;
  width: 130px;
  height: 130px;
  border-radius: 130px;
`;