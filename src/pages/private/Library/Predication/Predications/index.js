import React, { useState, useEffect, useContext } from 'react';
import { Feather } from '@expo/vector-icons';

import api from '~/services/api';
import Program from '~/components/Program';

import { Container, PlayList } from './styles';
import { PlayerContext } from '~/context/player.context';

export default function Predications() {
  const [newMedias, setNewMedias] = useState([]);
  const [newMediasFake, setNewMediasFake] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isLoading, setLoading] = useState(true);
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
        setTimeout(function(){
          const data = response.data.data?.item || response.data.item;
          setNewMedias(data);
          setLoading(false);
        }, 1000);
      }).catch((e) => {
        console.error(e);
      })
    }
    loadPrograms();
  }, []);

  const onMediaPress = (media) => {
    setCurrentPlaylist({ items: [media] });
  }

  return (
    <Container>
      {
        !isLoading ?
        <PlayList>
        {newMedias &&
          newMedias.map((media, index) => (
            <Program key={index} program={media} onPress={() => onMediaPress(media)} isPlaceholder={false}/>
          ))}
        </PlayList>
        :
        <PlayList style={{ marginTop: 15 }}>
        {newMediasFake &&
          newMediasFake.map((media, index) => (
            <Program key={index} program={media} isPlaceholder={true}/>
          ))}
        </PlayList>
      }
    </Container>
  );
}

Predications.navigationOptions = {
  tabBarLabel: 'Nouveautés',
};
