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
      api.post('/media/explorer').then((response) => {
        setMainList(response.data.data)
      }).catch(e => console.error(e));
    }
    loadMainList();
  }, []);

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
