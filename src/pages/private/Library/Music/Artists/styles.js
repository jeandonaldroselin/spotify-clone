import styled from 'styled-components/native';
import { View } from "react-native";
import React from "react";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 25px 0px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ArtistBox = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Artist = styled.TouchableOpacity`
  margin-bottom: 50px;
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const ArtistName = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

export const ArtistImage = styled.Image`
  background-color: #fff;
  width: 130px;
  height: 130px;
  border-radius: 130px;
`;
