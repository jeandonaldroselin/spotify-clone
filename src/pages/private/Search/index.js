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
import { BackHandler, Dimensions } from "react-native";
import { PlayerContext } from '~/context/player.context';
import SkeletonLoader from "expo-skeleton-loader";
import { PlayList } from '../Library/Predication/Predications/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

export default function Search() {
  const [themes, setThemes] = useState([]);
  const [themesPlaceholder] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }]);
  const [isSearchingTheme, setIsSearchingTheme] = useState(false);
  const [isSearchingContent, setIsSearchingContent] = useState(false);
  const [showThemeOrContent, setShowThemeOrContent] = useState('theme');// theme / content
  const [searchAudios, setSearchAudios] = useState([]);
  const [criteria, setCriteria] = useState('');
  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",
  () => {
    goBackToList();
    return true;
  });
  useEffect(() => {
    function loadSessions() {
      let body = {
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "fullname"
      };
      setIsSearchingTheme(true);
      api.post('/media/theme/find', JSON.stringify(body)).then((response) => {
        setTimeout(() => {
          const data = response.data.data?.item || response.data.item;
          setThemes(data);
          setIsSearchingTheme(false);
          setShowThemeOrContent('theme');
        }, 2000);
      }).catch(e => console.error(e));
    }
    loadSessions();
    return () => backHandler.remove();
  }, []);

  const goBackToList = () => {
    setIsSearchingTheme(false);
    setIsSearchingContent(false);
    setShowThemeOrContent('theme');
  }

  const onInputSearchField = (inputValue) => {
    if (inputValue.length >= 3) {
      searchMedia(inputValue);
    }
  }

  const onThemePress = (themeName, themeId) => {
    searchMedia(themeName, themeId);
  }

  const onMediaPress = (media) => {
    setCurrentPlaylist([media]);
  }

  const searchMedia = (content, themeId) => {
    let body = {
      "section": ["predication", "music"],
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 10,
      "sortBy": "title"
    }
    if (!!content) {
      setCriteria(content);
    }
    if (!!themeId) {
      body.theme = themeId;
    } else {
      if (!!content) {
        body.content = content.toLowerCase();
      }
    }
    setIsSearchingContent(true);
    setShowThemeOrContent('content');
    api.post('/media/find', JSON.stringify(body)).then((response) => {
      setTimeout(() => {
        const data = response.data.data?.item || response.data.item;
        setSearchAudios(data);
        setIsSearchingContent(false);
      }, 500);
    }).catch((e) => {
      console.error(e);
      setIsSearchingContent(false);
    })
  }

  return (
    <Container>
      <Title>Recherche</Title>
      <InputContainer>
        <Input leftIconName={'search'} placeholder="Mots-clés, prédicateurs, titres..." onChangeText={(value) => onInputSearchField(value)} />
      </InputContainer>
      {!isSearchingTheme && showThemeOrContent == 'theme' &&
        <>
          <SubTitle>Rechercher par thèmes</SubTitle>
        </>
      }
      {(!isSearchingTheme && showThemeOrContent == 'theme') &&
        <>
          <SessionList
            data={themes}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Session background={item.color} onPress={() => onThemePress(item.name, item.id)}>
                <SessionImage source={item.image === "" ? null : { uri: item.image }} />
                <SessionTitle>{item.name}</SessionTitle>
              </Session>)} />

        </>}
      {(isSearchingTheme && showThemeOrContent == 'theme') &&
        <>
          <SessionList
            data={themesPlaceholder}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <SkeletonLoader >
                <SkeletonLoader.Container style={[{ flex: 1, flexDirection: "row", width: '100%' }]} >
                  <SkeletonLoader.Item style={{  width: ((Dimensions.get('window').width - 64)/2),  height: 90, position: 'relative', margin: 10, borderRadius: 4 }}/>
                </SkeletonLoader.Container>
              </SkeletonLoader>
            )} />
        </>}


      {isSearchingContent && showThemeOrContent == 'content' && 
      <>
        <PlayList style={{ marginTop: 25 }}>
        {[0,1,2,3,4,5,6,7,8,9,10].map((media, index) => (
            <SkeletonLoader style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: 15,
                  height: 70,
                  width: '100%'
              }}>
                  <SkeletonLoader.Container style={{ 
                    height: 42,
                    width: 42,
                    backgroundColor: '#272829',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4
                  }}>
                      <SkeletonLoader.Item style={{ width: 42,  height: 42 }}/>
                  </SkeletonLoader.Container>

                  <SkeletonLoader.Container style={{
                    justifyContent: 'center',
                    width: '100%'
                  }}>
                      <SkeletonLoader.Item style={{ 
                          color: 'white',
                          fontWeight: 'bold',
                          marginLeft: 15,
                          marginBottom: 2,
                          width: '80%',
                          height: 10
                      }}/>
                      <SkeletonLoader.Item style={{ 
                          color: '#999',
                          fontWeight: 'bold',
                          fontSize: 12,
                          marginLeft: 15,
                          marginTop: 5,
                          width: '75%',
                          height: 10
                        }}/>
                  </SkeletonLoader.Container>

            </SkeletonLoader>
            ))}
        </PlayList>
      </>}
      
      {!isSearchingContent && showThemeOrContent == 'content' && 
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}>
            <TouchableOpacity onPress={goBackToList} >
              <MaterialIcons
                name={'arrow-back'}
                color="white"
                size={20}
                style={{ width: 20 }}
              />
            </TouchableOpacity>
            <SubTitle> {searchAudios.length > 0 ? `Résultats pour "${criteria}"` : `Aucun résultat pour "${criteria}". Veuillez changer de critères de recherche ou cliquer sur la flèche retour`}</SubTitle>
          </View>
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
