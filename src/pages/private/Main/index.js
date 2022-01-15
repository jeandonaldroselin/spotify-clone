import React, { useState, useEffect } from 'react';

import PodcastsSlide from '~/components/PodcastsSlide';

import api from '../../../services/api';

import { Container, ContainerScrollView } from './styles';

export default function Main() {
  const [mainList, setMainList] = useState([]);

  useEffect(() => {
    async function loadMainList() {
      const favorites = await getFavorites();
      const recents = await getRecents();
      const thematicOne = await getThematicPredications('Prière');
      const thematicTwo = await getThematicPredications('Esprit');
      setMainList([recents, favorites, thematicOne, thematicTwo]);
    }
    loadMainList();
  }, []);

  const getFavorites = async () => {
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
    const response = await api.post('/media/find', JSON.stringify(body));
    return { title: 'Vos favoris', items: response.data.data?.item || response.data.item }
  }

  const getThematicPredications = async (theme) => {
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
    const response = await api.post('/media/find', JSON.stringify(body));
    return { title: 'Prédications : ' + theme, items: response.data.data?.item || response.data.item }
  }

  const getRecents = async () => {
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
    const response = await api.post('/media/find', JSON.stringify(body));
    return { title: 'Prédications récentes', items: response.data.data?.item || response.data.item }
  }

  return (
    <Container>
      <ContainerScrollView>
        {mainList &&
          mainList.map((item, index) => (
            <PodcastsSlide key={index} list={item} />
          ))}
      </ContainerScrollView>
    </Container>
  );
}
