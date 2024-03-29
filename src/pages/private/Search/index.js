import React, { useState, useEffect, useContext } from 'react';

import api from '../../../services/api';

import Input from '~/components/Input';

import {
  Container,
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
  SearchItemDetails,
} from './styles';
import { BackHandler } from 'react-native';
import { PlayerContext } from '~/context/player.context';

export default function Search() {
  const [categories, setCategories] = useState([]);
  const [categoriesPlaceholder] = useState([{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14}]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchAudios, setSearchAudios] = useState([]);
  const { setCurrentPlaylist } = useContext(PlayerContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress",
      () => {
        setIsSearching(false);
        return true;
    });

    function loadSessions() {
      let body = {
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "fullname"
      };
      api.post('/media/category/find', JSON.stringify(body)).then((response) => {
        const data = response.data.data?.item || response.data.item;
        setTimeout(function() {
          setCategories(data);
        }, 500)
      }).catch(e => console.error(e));
    }
    loadSessions();
    return () => backHandler.remove();
  }, []);

  const onInputSearchField = (inputValue) => {
    if (inputValue.length >= 3) {
      searchMedia(inputValue);
    } else {
      setIsSearching(false);
    }
  }

  const onCategoryPress = (categoryId) => {
    searchMedia(null, categoryId);
  }

  const onMediaPress = (media) => {
    setCurrentPlaylist([media]);
  }

  const searchMedia = (content, categoryId) => {
    let body = {
      "section": "predication",
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 10,
      "sortBy": "title"
    }
    if (!!content) {
      body.content = content.toLowerCase();
    }
    if (!!categoryId) {
      body.category = categoryId;
    }
    api.post('/media/find', JSON.stringify(body)).then((response) => {
      const data = response.data.data?.item || response.data.item;
      setSearchAudios(data);
      setIsSearching(true);
    }).catch((e) => {
      console.error(e);
      setIsSearching(false);
    })
  }

  return (
    <Container>
        <Title>Recherche</Title>
        <InputContainer>
          <Input placeholder="Mots-clés, prédicateurs, titres..." onChangeText={(value) => onInputSearchField(value)} />
        </InputContainer>
      {!isSearching &&
        <>
        <SubTitle>Rechercher par thèmes</SubTitle>
        </>
      }
      {(!isSearching && categories.length > 0) &&
      <>
        <SessionList
          data={categories}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Session background={item.color} onPress={() => onCategoryPress(item.id)}>
              <SessionImage source={item.image === "" ? null : { uri: item.image }} />
              <SessionTitle>{item.name}</SessionTitle>
            </Session>)} />

      </>}
      {(!isSearching && categories.length === 0) &&
      <>
        <SessionList
          data={categoriesPlaceholder}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Session background={'rgba(255,255,255,0.1)'}>
            </Session>)} />
      </>}

        {isSearching &&
          <>
            <SearchItemList
              data={searchAudios}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <SearchItem onPress={() => onMediaPress(item)}>
                  <SearchItemImage source={item.previewImage === "" ? null : { uri: item.previewImage }}></SearchItemImage>
                  <SearchItemDetails>
                    <SearchItemTitle>{item.title}</SearchItemTitle>
                    <SearchItemSubTitle>{item.author.fullName}</SearchItemSubTitle>
                  </SearchItemDetails>
                </SearchItem>)} />

          </>}
    </Container>
  );
}
