import React, { useContext, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Container, Left, Right, Image, NameContainer, Name } from './styles';
import { PlayerContext } from '~/context/player.context';
import TextTicker from 'react-native-text-ticker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MiniPlayer() {
  const { currentMediaPlaylistId, currentPlaylist } = useContext(PlayerContext);

  const onPlayPress = () => {
    console.log('play')
  }

  return (
    <Container>
      <Left>
        <Image
          source={{
            uri:
              currentPlaylist[currentMediaPlaylistId].previewImage,
          }}
        />
        <NameContainer>
          <TextTicker duration={10000} style={{ color: 'white', fontSize: 11 }}>{currentPlaylist[currentMediaPlaylistId].title}</TextTicker>
          <Name>{currentPlaylist[currentMediaPlaylistId]?.author?.fullName}</Name>
        </NameContainer>
      </Left>
      <Right>
        {/* <MaterialIcons
          name="favorite-outline"
          color="white"
          size={26}
          style={{ width: 30, marginRight: 10 }}
        /> */}
        <TouchableOpacity onPress={onPlayPress}>
          <MaterialIcons
            name="play-arrow"
            color="white"
            size={30}
            style={{ width: 30, marginRight: 10 }}
          />
        </TouchableOpacity>
      </Right>
    </Container>
  );
}
