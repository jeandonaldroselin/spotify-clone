import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #272829;
  border-top-color: #ccc;
  border-top-width: 2px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  flex:3;
  overflow:hidden;
`;

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
  flex:1;
`;

export const Image = styled.Image`
  height: 48px;
  width: 48px;
`;

export const NameContainer = styled.View`
  margin-left: 10px;
`;

export const Name = styled.Text.attrs({
  numberOfLines:1
})`
  color: white;
  font-size: 11px;
`;
