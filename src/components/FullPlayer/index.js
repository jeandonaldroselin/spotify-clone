import React, { useContext, useEffect, useState } from "react";
import {
  Ionicons,
  EvilIcons,
  AntDesign,
  MaterialIcons,
  Feather as Icon,
} from '@expo/vector-icons';

import {
  Container,
  Background,
  InnerContainer,
  Header,
  Button,
  Name,
  PodImage,
  PlayerView,
  PodTitle,
  PodAuthor,
  Metadata,
  Controls,
  Speed,
  Footer,
} from './styles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { Audio, Video } from 'expo-av';
import { PlayerContext } from "~/context/player.context";
import TextTicker from "react-native-text-ticker";
import Slider from "@react-native-community/slider";

//let dirs = RNFetchBlob.fs.dirs.DocumentDir;
const dirs = FileSystem.documentDirectory;

export default function FullPlayer({ onChevronDownPress, onTitlePress }) {
  const {
    currentPlaylist,
    currentMediaPlaylistId,
    isPlaying,
    onStartPress,
    onPausePress,
    onBackward,
    onForward,
    duration,
    timeElapsed,
    percent,
    inProgress,
    changeTime
  } = useContext(PlayerContext);

  const msToTime = (duration) => {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  return (
    <Container>
      <Background>
        <InnerContainer>
          <Header>
            <Name>{currentPlaylist.items[currentMediaPlaylistId]?.title}</Name>
            <Button onPress={onChevronDownPress}>
              <Icon name="chevron-down" color="white" size={24} />
            </Button>
          </Header>
          <PodImage source={{ uri: currentPlaylist.items[currentMediaPlaylistId]?.previewImage }} />
          <Metadata>
            <PlayerView>
              <TextTicker duration={10000} onPress={() => onTitlePress(currentPlaylist)}
                style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{currentPlaylist.items[currentMediaPlaylistId]?.title}</TextTicker>
              <PodAuthor>{currentPlaylist.items[currentMediaPlaylistId]?.author?.fullName}</PodAuthor>
            </PlayerView>
          </Metadata>

          <View style={styles.seekbar}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#ffffff"
              minimumTrackTintColor="#ffffff"
              value={percent}
              onValueChange={changeTime}
            />
            <View style={styles.inprogress}>
              <Text style={[styles.textLight, styles.timeStamp]}>
                {!inProgress
                  ? timeElapsed
                  : msToTime(Math.floor(timeElapsed))}
              </Text>
              <Text style={[styles.textLight, styles.timeStamp]}>
                {!inProgress
                  ? duration
                  : msToTime(Math.floor(duration))}
              </Text>
            </View>
          </View>
          <Controls>
            <AntDesign
              name="stepbackward"
              color={currentMediaPlaylistId > 0 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'}
              size={28}
              onPress={onBackward}
            />
            <AntDesign onPress={() => !isPlaying ? onStartPress(true) : onPausePress(true)} name={!isPlaying ? 'play' : 'pause'} color="white" size={54} />
            <AntDesign
              name="stepforward"
              color={currentMediaPlaylistId < currentPlaylist.items?.length - 1 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'}
              size={28}
              onPress={onForward}
            />
          </Controls>
        </InnerContainer>
      </Background>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  titleContainer: { alignItems: 'center', marginTop: 24 },
  textDark: {
    color: '#19D648',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  coverContainer: {
    marginTop: 32,
    width: '100%',
    maxWidth: 370,
    height: 350,
  },
  cover: {
    width: '100%',
    height: '100%'
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
    color: 'white'
  },
  seekbar: { margin: 32 },
  inprogress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: { alignItems: 'center', marginTop: 32 },
});
