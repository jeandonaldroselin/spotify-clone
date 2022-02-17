import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, View } from "react-native";
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../../Predication/Predications/styles';

import { Artist, ArtistBox, ArtistImage, ArtistName, Container } from './styles';

export default function Artists() {
  const [currentArtist, setCurrentArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [artistsPlaceholder] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]);
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
        const data = response.data.data?.item || response.data.item;
        setArtists(data);
        console.log('data artists', data);
      })
    }
    loadArtists();
    return () => backHandler.remove();
  }, []);

  const onArtistPress = (artist) => {
    let body = {
      "author": artist.id,
      "section": "music",
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
    <Container>
      {!currentArtist && artists?.length > 0
        && artists.map(artist => (
          <ArtistBox key={artist.id}>
            <Artist onPress={() => onArtistPress(artist)}>
              <ArtistImage source={{ uri: artist.image }}></ArtistImage>
              <ArtistName>{artist.fullName}</ArtistName>
            </Artist>
          </ArtistBox>
        ))}

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
  );
}

Artists.navigationOptions = {
  tabBarLabel: 'Artistes',
};
