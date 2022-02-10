import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #121212;
`;

export const InputContainer = styled.View`
  background-color: #121212;
  padding: 10px 0;
`;

export const Title = styled.Text`
  font-size: 29px;
  font-weight: bold;
  color: white;
  padding: 20px 20px 0;
`;

export const SubTitle = styled.Text`
  font-weight: bold;
  color: white;
  padding: 10px 20px;
`;

export const SessionList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 10px;
  margin-bottom: 5px;
`;

export const Session = styled.TouchableOpacity`
  width: ${(Dimensions.get('window').width - 64)/2}
  height: 90px;
  background-color: ${props => props.background};
  margin: 10px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

export const SessionImage = styled.Image`
  position:absolute;
  width:100%;
  height:100%;
`;

export const SessionTitle = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin: auto;
`;

export const SearchItemList = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false
})`
  padding: 10px;
`;

export const SearchItem = styled.TouchableOpacity`
  margin: 10px;
  position: relative;
  overflow: hidden;
  display:flex;
  flex-direction:row;
`;

export const SearchItemImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const SearchItemTitle = styled.Text.attrs({
  numberOfLines: 1
})`
  margin-left: 10px;
  color: white;
  font-weight: bold;
`;

export const SearchItemDetails = styled.View`
  width: 85%;
`;

export const SearchItemSubTitle = styled.Text.attrs({
  numberOfLines: 1
})`
  margin-left: 10px;
  color: white;
  width: 85%;
`;
