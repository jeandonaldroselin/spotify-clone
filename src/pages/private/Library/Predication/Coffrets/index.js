import React, { useState, useEffect, Fragment, useContext } from 'react';

import api from '~/services/api';
import DailyChapters from '~/components/DailyChapters';
import Chapter from '~/components/DailyChapters/Chapter';

import { Container, ChaptersList, Title } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackHandler } from 'react-native';
import { PlayerContext } from '~/context/player.context';
import SkeletonLoader from "expo-skeleton-loader";

export default function Episodios() {
  const [currentCoffret, setCurrentCoffret] = useState(null);
  const [coffrets, setCoffrets] = useState([]);
  const { setCurrentPlaylist } = useContext(PlayerContext);
  const [coffretsPlaceholder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isLoading, setLoading] = useState(true);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",
  () => {
    setCurrentCoffret(null);
    return true;
  });
  useEffect(() => {

    function loadCoffrets() {
      let body = {
        "startReleaseDate": "1950-01-15",
        "endReleaseDate": (new Date()).toISOString().split('T')[0],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "releaseDate"
      }
      api.post('/media/boxset/find', JSON.stringify(body)).then((response) => {
        setTimeout(function() {
          const data = response.data.data?.item || response.data.item;
          setCoffrets(data);
          setLoading(false);
        }, 2000)
      })
    }
    loadCoffrets();
    return () => backHandler.remove();
  }, []);

  const onCoffretPress = (coffret) => {
    const items = coffret.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.previewImage = coffret.image;
    }
    setCurrentCoffret(coffret);
  }

  const onCoffretItemPress = (media) => {
    setCurrentPlaylist(currentCoffret.items, media.track - 1);
  }

  return (
    <>
    {
      !isLoading ?
      <Container>
          <ChaptersList>
            {!currentCoffret &&
              coffrets.map(coffret => (
                <TouchableOpacity key={coffret.id} onPress={() => onCoffretPress(coffret)}>
                  <Fragment>
                    <Chapter
                      chapter={{
                        time: coffret.duration,
                        title: coffret.title,
                        image: coffret.image,
                        author: coffret.author,
                        description: coffret.description,
                      }} />
                  </Fragment>
                </TouchableOpacity>
              ))}
            {currentCoffret &&
              <Fragment key={currentCoffret.id}>
                <Title>{currentCoffret.title}</Title>
                <DailyChapters dailyChapters={currentCoffret} onPress={onCoffretItemPress} />
              </Fragment>}
          </ChaptersList>
      </Container>
      :
      <SkeletonLoader style={{
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingHorizontal: 0,
        backgroundColor: '#121212'
      }}>
        {coffretsPlaceholder.map(item => (
              <SkeletonLoader.Container style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  height: 120,
                  marginBottom: 30
              }}>
                  <SkeletonLoader.Item style={{ 
                    width: 370,
                    height: 120,
                    marginBottom: 10,
                    borderRadius: 3
                  }}/>
              </SkeletonLoader.Container>
        ))}
      </SkeletonLoader>
    }
    </>
  );
}

Episodios.navigationOptions = {
  tabBarLabel: 'Coffrets',
};
