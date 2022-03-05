import React, { useState, useEffect, useContext } from 'react';
import { Feather } from '@expo/vector-icons';

import api from '~/services/api';
import Program from '~/components/Program';

import { Container, PlayList } from './styles';
import { PlayerContext } from '~/context/player.context';

export default function Predications() {
  const [newMedias, setNewMedias] = useState([]);
  const { setCurrentPlaylist } = useContext(PlayerContext);

  useEffect(() => {
    function loadPrograms() {
      let body = {
        "section": ["predication"],
        "type": "audio",
        "startReleaseDate": "2015-01-15",
        "endReleaseDate": (new Date()).toISOString().split('T')[0],
        "page": 1,
        "resultPerPage": 10,
        "sortBy": "releaseDate"
      }
      api.post('/media/find', JSON.stringify(body)).then((response) => {
        const data = response.data.data?.item || response.data.item;
        setNewMedias(data);
      }).catch((e) => {
        console.error(e);
      })
    }
    loadPrograms();
  }, []);

  const onMediaPress = (media) => {
    setCurrentPlaylist([media]);
  }

  return (
    <Container>
      <PlayList>
        {newMedias &&
          newMedias.map((media, index) => (
            <Program key={index} program={media} onPress={() => onMediaPress(media)} />
          ))}
      </PlayList>
    </Container>
  );
}

Predications.navigationOptions = {
  tabBarLabel: 'Nouveautés',
};
