import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, View } from "react-native";
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../../Predication/Predications/styles';
import { ArtistList, Artist, ArtistBox, ArtistImage, ArtistName, Container } from './styles';
import SkeletonLoader from "expo-skeleton-loader";

export default function Artists() {
  const [currentArtist, setCurrentArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [artistsPlaceholder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isLoading, setLoading] = useState(true);
  const { setCurrentPlaylist } = useContext(PlayerContext);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress",
      () => {
        setCurrentArtist(null);
        return true;
      });
    function loadArtists() {
      let body = {
        "section": ["music"],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "fullname"
      }
      api.post('/media/author/find', JSON.stringify(body)).then((response) => {
        setTimeout(function(){
          const data = response.data.data?.item || response.data.item;
          setArtists(data);
          setLoading(false);
        }, 2000);
      })
    }
    loadArtists();
    return () => backHandler.remove();
  }, []);

  const onArtistPress = (artist) => {
    let body = {
      "author": artist.id,
      "section": ["music"],
      "type": "audio",
      "startReleaseDate": "1950-01-15",
      "endReleaseDate": (new Date()).toISOString().split('T')[0],
      "page": 1,
      "resultPerPage": 30,
      "sortBy": "releaseDate"
    };
    api.post('/media/find', JSON.stringify(body)).then((response) => {
      const data = response.data.data?.item || response.data.item;
      const artistTemp = { ...artist };
      artistTemp.items = data;
      setCurrentArtist(artistTemp);
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
      <ArtistList>
        {!currentArtist && artists?.length > 0
          && artists.map(artist => (
            <ArtistBox key={artist.id}>
              <Artist onPress={() => onArtistPress(artist)}>
                <ArtistImage source={{ uri: artist.image }}></ArtistImage>
                <ArtistName>{artist.fullName}</ArtistName>
              </Artist>
            </ArtistBox>
          ))}
      </ArtistList>

      {!currentArtist && artists?.length === 0
        && artistsPlaceholder.map(artist => (
          <ArtistBox key={artist.id}>
            <Artist>
              <ArtistImage source={{ uri: null }} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></ArtistImage>
              <View style={{ marginTop: 10, width: 60, height: 11, backgroundColor: 'rgba(255,255,255,0.6)', margin: 20, alignSelf: 'center' }}>

              </View>
            </Artist>
          </ArtistBox>
        ))}

      {!currentArtist &&
        <PlayList>
          {currentArtist?.items
            && currentArtist.items.map(item => {
              <Program key={item.id} program={item} onPress={() => onMediaPress(item)} />
            })}
        </PlayList>
      }
    </Container>
    :
    <SkeletonLoader style={{
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        paddingHorizontal: 0,
        backgroundColor: '#121212'
    }}>
      {artistsPlaceholder.map(predicator => (
            <SkeletonLoader.Container style={{
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
  tabBarLabel: 'Artistes',
};
