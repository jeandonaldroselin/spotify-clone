import React, { useState, useEffect, useContext } from 'react';
import PodcastsSlide from '~/components/PodcastsSlide';
import { PlayerContext } from '~/context/player.context';
import api from '../../../services/api';
import { Container, ContainerScrollView } from './styles';

const MEDIA_PLACEHOLDER = {
  id: 0,
  previewImage: null,
  title: '',
  type: "audio",
  section: 'predication',
  durationInSecond: 0,
  positionInSecond: 0,
  releaseDateTimestamp: 101010000,
  releaseDate: "05-12-2001",
  playUrl: "",
  downloadUrl: "",
  isFavorite: false,
  description: "",
  author: { fullName: 'chargement' },
  featuring: [],
  album: null,
  category: []
};
const EXPLORER_PLACEHOLDER_ROW = { title: 'hhh', medias: [MEDIA_PLACEHOLDER, MEDIA_PLACEHOLDER, MEDIA_PLACEHOLDER, MEDIA_PLACEHOLDER, MEDIA_PLACEHOLDER] };

export default function Explorer() {
  const [mainList, setMainList] = useState([]);
  const [mainListPlaceholder] = useState([
    EXPLORER_PLACEHOLDER_ROW,
    EXPLORER_PLACEHOLDER_ROW,
    EXPLORER_PLACEHOLDER_ROW,
    EXPLORER_PLACEHOLDER_ROW
  ]);

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
    if (media.playUrl.length > 0) {
      setCurrentPlaylist({ items: [media] });
    }
  }

  return (
    <Container>
      <ContainerScrollView>
        {mainList.length > 0 &&
          mainList.map((item, index) => (
            <PodcastsSlide key={index} list={item} isPlaceholder={false} onItemPress={onItemPress} />
          ))}
        {mainList.length === 0 &&
          mainListPlaceholder.map((item, index) => (
            <PodcastsSlide key={index} list={item} isPlaceholder={true} onItemPress={onItemPress} />
          ))}
      </ContainerScrollView>
    </Container>
  );
}
