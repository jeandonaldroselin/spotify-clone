import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, View } from "react-native";
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../Predications/styles';

import { Container, Predicator, PredicatorBox, PredicatorImage, PredicatorName } from "./styles";

export default function Artists() {
  const [currentPredicator, setCurrentPredicator] = useState(null);
  const [predicators, setPredicators] = useState([]);
  const [predicatorsPlaceholder] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]);
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
        console.log('data ppredicator', data);
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
      {!currentPredicator && predicators?.length > 0
        && predicators.map(predicator => (
          <PredicatorBox key={predicator.id}>
            <Predicator onPress={() => onPredicatorPress(predicator)}>
              <PredicatorImage source={{ uri: predicator.image }}></PredicatorImage>
              <PredicatorName>{predicator.fullName}</PredicatorName>
            </Predicator>
          </PredicatorBox>
        ))}

      {!currentPredicator && predicators?.length === 0
        && predicatorsPlaceholder.map(predicator => (
          <PredicatorBox key={predicator.id}>
            <Predicator>
              <PredicatorImage source={{ uri: null }} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></PredicatorImage>
              <View style={{ marginTop: 10, width: 60, height: 11, backgroundColor: 'rgba(255,255,255,0.6)', margin: 20, alignSelf: 'center' }}>

              </View>
            </Predicator>
          </PredicatorBox>
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
