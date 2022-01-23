import React, { useState, useEffect, useContext } from 'react';

import PodcastsSlide from '~/components/PodcastsSlide';
import { PlayerContext } from '~/context/player.context';

import api from '../../../services/api';

import { Container, ContainerScrollView } from './styles';

export default function Main() {
  const [mainList, setMainList] = useState([]);
  const { setCurrentPlaylist } = useContext(PlayerContext);

  useEffect(() => {
    function loadMainList() {
      const promises = Promise.all([
        getFavorites(),
        getRecents(),
        getThematicPredications('Prière'),
        getThematicPredications('Esprit')
      ]).then(([favorites, recents, thematicOne, thematicTwo])=>{
        setMainList([
          convertDataToItems('Prédications récentes', recents.data),
          convertDataToItems('Vos favoris', favorites.data),
          convertDataToItems('Prédications : Prière', thematicOne.data), 
          convertDataToItems('Prédications : Esprit', thematicTwo.data)
        ]);
      }).catch(e => {
        console.error(e)
      })
    }
    loadMainList();
  }, []);

  const getFavorites = () => {
    let body = {
      "section": "predication",
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 20,
      "isFavorite": true,
      "sortBy": "releaseDate",
      "sortDirection": "DESC"
    }
    return api.post('/media/find', JSON.stringify(body));
  }

const convertDataToItems = (title, data) => {
  return { title, items: data.data?.item || data.item }
}

  const getThematicPredications = (theme) => {
    let body = {
      "content": theme.toLowerCase(),
      "section": "predication",
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 10,
      "isFavorite": true,
      "sortBy": "releaseDate",
      "sortDirection": "DESC"
    }
    return api.post('/media/find', JSON.stringify(body));
  }

  const getRecents = () => {
    let body = {
      "section": "predication",
      "type": "audio",
      "startReleaseDate": "2015-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 10,
      "sortBy": "releaseDate",
      "sortDirection": "DESC"
    }
    return api.post('/media/find', JSON.stringify(body));
  }

  const onItemPress = (media) => {
    setCurrentPlaylist([media])
  }

  return (
    <Container>
      <ContainerScrollView>
        {mainList &&
          mainList.map((item, index) => (
            <PodcastsSlide key={index} list={item} onItemPress={onItemPress} />
          ))}
      </ContainerScrollView>
    </Container>
  );
}
