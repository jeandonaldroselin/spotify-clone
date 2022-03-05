import styled from 'styled-components/native';
import { View } from "react-native";
import React from "react";

export const Container = styled.View`
  background-color: #121212;
  flex:1;
`;

export const PredicatorList = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})`
  padding: 20px 0;
`;

export const PredicatorBox = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

export const Predicator = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const PredicatorName = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

export const PredicatorImage = styled.Image`
  background-color: #fff;
  width: 130px;
  height: 130px;
  border-radius: 130px;
`;
