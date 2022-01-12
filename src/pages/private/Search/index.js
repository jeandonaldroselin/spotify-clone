import React, { useState, useEffect, useContext } from 'react';

import api from '../../../services/api';

import Input from '~/components/Input';

import {
  Container,
  ScrollView,
  Title,
  SubTitle,
  InputContainer,
  SessionList,
  Session,
  SessionImage,
  SessionTitle,
  SearchItemList,
  SearchItem,
  SearchItemImage,
  SearchItemTitle,
  SearchItemSubTitle,
} from './styles';
import { AuthenticationContext } from '~/context/authentication.context';
import { View } from 'react-native';

export default function Search() {
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchAudios, setSearchAudios] = useState([]);
  const { accessToken } = useContext(AuthenticationContext);
  const headers = {
    "Authorization": "Bearer " + accessToken
  };

  useEffect(() => {
    async function loadSessions() {

      const { data } = await api.get('/themes', { headers });
      setCategories(data);
    }
    loadSessions();
  }, []);

  const onInputSearchField = (inputValue) => {
    if (inputValue.length >= 3) {
      let body = {
        "content": inputValue.toLowerCase(),
        "section": "predication",
        "type": "audio",
        "startReleaseDate": "1900-01-15",
        "endReleaseDate": (new Date()).toISOString().split('T')[0],
        "page": 1,
        "resultPerPage": 10,
        "sortBy": "releaseDate",
        "sortDirection": "DESC"
      }
      api.get('/media/find', { headers, body: JSON.stringify(body) }).then((response) => {
        console.log(response)
        setSearchAudios(response.data.item);
        setIsSearching(true);
      }).catch((e) => {
        console.error(e);
      })
    } else {
      setIsSearching(false);
    }
  }

  return (
    <Container>
      <ScrollView>
        <Title>Recherche</Title>
        <InputContainer>
          <Input placeholder="Mots-clés, prédicateurs, titres...                     x" onChangeText={onInputSearchField} />
        </InputContainer>
        {!isSearching &&
          <>
            <SubTitle>Rechercher par thèmes</SubTitle>
            <SessionList
              data={categories}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Session background={item.color}>
                  <SessionImage source={{ uri: item.image }} />
                  <SessionTitle>{item.name}</SessionTitle>
                </Session>)} />

          </>}
        {isSearching &&
          <>
            <SearchItemList
              data={searchAudios}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <SearchItem>
                  <SearchItemImage source={{ uri: item.previewImage }}></SearchItemImage>
                  <View>
                    <SearchItemTitle>{item.title}</SearchItemTitle>
                    <SearchItemSubTitle>{item.author.fullName}</SearchItemSubTitle>
                  </View>
                </SearchItem>)} />

          </>}
      </ScrollView>
    </Container>
  );
}
