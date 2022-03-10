import React, { useContext, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { PlayList } from '../../Predication/Predications/styles';

import { Container } from './styles';

export default function Albums({navigation}) {
  const [newAlbums, setNewAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newAlbumsFake, setNewAlbumsFake] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isLoading, setLoading] = useState(true);
  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",
  () => {
    return true;
  });
  useEffect(() => {

    function loadAlbums() {
      let body = {
        "startReleaseDate": "1950-01-15",
        "endReleaseDate": (new Date()).toISOString().split('T')[0],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "releaseDate"
      }
      api.post('/media/album/find', JSON.stringify(body)).then((response) => {
        setTimeout(function(){
          const data = response.data.data?.item || response.data.item;
          setNewAlbums(data);
          setLoading(false);
        }, 3000);
      }).catch((e) => {
        console.error(e);
      })
    }
    loadAlbums();
    return () => backHandler.remove();
  }, []);

  const onAlbumPress = (album) => {
     album.items.map(item => {
      item.previewImage = album.image;
      item.author = album.author;
    });
    const libraryStackNavigation = navigation.dangerouslyGetParent();
    libraryStackNavigation.navigate('CoffretDetails', [album]);
  }
  return (
    <Container>

      {
        !isLoading ?
        <PlayList>
          {!currentAlbum && newAlbums &&
            newAlbums.map((album, index) => (
              <Program key={index} program={album} onPress={() => onAlbumPress(album)} />
            ))}
        </PlayList>
        :
        <PlayList style={{ marginTop: 15 }}>
        {newAlbumsFake &&
          newAlbumsFake.map((media, index) => (
            <Program key={index} program={media} isPlaceholder={true}/>
          ))}
        </PlayList>
      }
    </Container>
  );
}

Albums.navigationOptions = {
  tabBarLabel: 'Albums',
};
