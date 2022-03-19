import React, { useContext, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Container, Left, Right, Image, NameContainer, Name } from './styles';
import { PlayerContext } from '~/context/player.context';
import TextTicker from 'react-native-text-ticker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MiniPlayer() {
  const { currentMediaPlaylistId, currentPlaylist, setIsPlaying, isPlaying, sound } = useContext(PlayerContext);

  const onPlayPress = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      await sound.sound.pauseAsync();
    } else {
      setIsPlaying(true);
      await sound.sound.playAsync();
    }
  }

  return (
    <Container>
      <Left>
        <Image
          source={{
            uri:
              currentPlaylist.items[currentMediaPlaylistId]?.previewImage,
          }}
        />
        <NameContainer>
          <TextTicker duration={10000} style={{ color: 'white', fontSize: 11 }}>{currentPlaylist.items[currentMediaPlaylistId]?.title}</TextTicker>
          <Name>{currentPlaylist.items[currentMediaPlaylistId]?.author?.fullName}</Name>
        </NameContainer>
      </Left>
      <Right>
        {/* <MaterialIcons
          name="favorite-outline"
          color="white"
          size={26}
          style={{ width: 30, marginRight: 10 }}
        /> */}
        <TouchableOpacity onPress={onPlayPress} >

          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            color="white"
            size={30}
            style={{ width: 30 }}
          />
        </TouchableOpacity>
      </Right>
    </Container>
  );
}
