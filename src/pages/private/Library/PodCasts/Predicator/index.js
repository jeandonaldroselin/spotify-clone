import React, { useContext, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../Predications/styles';

import { Container, Predicator, PredicatorImage, PredicatorName } from './styles';

export default function Artists() {
  const [currentPredicator, setCurrentPredicator] = useState(null);
  const [predicators, setPredicators] = useState([]);
  const { setCurrentPlaylist } = useContext(PlayerContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress",
      () => {
        setCurrentPredicator(null);
        return true;
      });
    function loadPredicators() {
      let body = {
        "section": ["predication"],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "fullname"
      }
      api.post('/media/author/find', JSON.stringify(body)).then((response) => {
        const data = response.data.data?.item || response.data.item;
        setPredicators(data);
      })
    }
    loadPredicators();
    return () => backHandler.remove();
  }, []);

  const onPredicatorPress = (predicator) => {
    let body = {
      "author": predicator.id,
      "section": "predication",
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 30,
      "sortBy": "releaseDate"
    };
    api.post('/media/find', JSON.stringify(body)).then((response) => {
      const data = response.data.data?.item || response.data.item;
      const predicatorTemp = { ...predicator };
      predicatorTemp.items = data;
      setCurrentPredicator(predicatorTemp);
    }).catch(e => console.error(e));
  }

  const onMediaPress = (media) => {
    setCurrentPlaylist([media]);
  }

  return (
    <Container>
      {!currentPredicator && predicators
        && predicators.map(predicator => (
          <Predicator key={predicator.id} onPress={() => onPredicatorPress(predicator)}>
            <PredicatorImage source={{ uri: predicator.image }}></PredicatorImage>
            <PredicatorName>{predicator.fullName}</PredicatorName>
          </Predicator>
        ))}

      {!currentPredicator &&
        <PlayList>
          {currentPredicator?.items
            && currentPredicator.items.map(item => {
              <Program key={item.id} program={item} onPress={() => onMediaPress(item)} />
            })}
        </PlayList>
      }
    </Container >
  );
}

Artists.navigationOptions = {
  tabBarLabel: 'Prédicateur',
};
