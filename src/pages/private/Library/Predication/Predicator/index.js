import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, View } from "react-native";
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../Predications/styles';
import { Container, Predicator, PredicatorBox, PredicatorImage, PredicatorList, PredicatorName } from "./styles";
import SkeletonLoader from "expo-skeleton-loader";

export default function Artists() {
  const [currentPredicator, setCurrentPredicator] = useState(null);
  const [predicators, setPredicators] = useState([]);
  const [predicatorsPlaceholder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isLoading, setLoading] = useState(true);
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
        setTimeout(function(){
          const data = response.data.data?.item || response.data.item;
          setPredicators(data);
          setLoading(false);
        }, 2000);
      })
    }
    loadPredicators();
    return () => backHandler.remove();
  }, []);

  const onPredicatorPress = (predicator) => {
    let body = {
      "author": predicator.id,
      "section": ["predication"],
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
    <>
    {
      !isLoading ?
      <Container>
          <PredicatorList>
            {!currentPredicator && predicators?.length > 0
              && predicators.map(predicator => (
                <PredicatorBox key={predicator.id}>
                  <Predicator onPress={() => onPredicatorPress(predicator)}>
                    <PredicatorImage source={{ uri: predicator.image }}></PredicatorImage>
                    <PredicatorName>{predicator.fullName}</PredicatorName>
                  </Predicator>
                </PredicatorBox>
              ))}
          </PredicatorList>

        {!currentPredicator &&
          <PlayList>
            {currentPredicator?.items
              && currentPredicator.items.map(item => {
                <Program key={item.id} program={item} onPress={() => onMediaPress(item)} />
              })}
          </PlayList>
        }
      </Container >
    :
    <SkeletonLoader style={{
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        paddingHorizontal: 0,
        backgroundColor: '#121212'
    }}>
      {predicatorsPlaceholder.map(predicator => (
            <SkeletonLoader.Container key={predicator} style={{
                display: 'flex',
                width: '50%',
                alignItems: 'center',
                height: 155,
                marginBottom: 26
            }}>
                <SkeletonLoader.Item style={{ 
                  width: 130,
                  height: 130,
                  borderRadius: 130
                }}/>

                <SkeletonLoader.Item style={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 10,
                  width: 100,
                  height: 14
                }}/>
            </SkeletonLoader.Container>
      ))}
    </SkeletonLoader>
    }
    </>
  );
}

Artists.navigationOptions = {
  tabBarLabel: 'Prédicateur',
};
