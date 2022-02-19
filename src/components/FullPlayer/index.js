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
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { Audio, Video } from 'expo-av';
import { PlayerContext } from "~/context/player.context";
import TextTicker from "react-native-text-ticker";

//let dirs = RNFetchBlob.fs.dirs.DocumentDir;
const dirs = FileSystem.documentDirectory;

export default function FullPlayer({ onPress }) {
  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [sound, setSound] = React.useState();
  const { currentPlaylist, currentMediaPlaylistId, setCurrentMediaPlaylistId, setIsPlaying } = useContext(PlayerContext);

  useEffect(async () => {
    if (sound !== undefined) {
      await onStopPress();
    }
    await onStartPress();
  }, [currentPlaylist, currentMediaPlaylistId])

  const changeTime = async (_percent) => {
    if (!sound) {
      return false;
    }
    const seektime = (_percent / 100) * duration;
    await sound.sound.setPositionAsync(seektime * 1000)
  };

  const onStartPress = async () => {
    setIsPlaying(true);
    setIsAlreadyPlay(true);
    setInprogress(true);
    const path = currentPlaylist[currentMediaPlaylistId].playUrl;
    if (sound?.sound) {
      const status = await sound.sound.getStatusAsync()
      if (path.includes(status.uri)) {
        await sound.sound.playAsync();
        return;
      }
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    const localSound = await Audio.Sound.createAsync({ uri: path });

    localSound.sound.setOnPlaybackStatusUpdate((e) => {
      if (!e) {
        return;
      }

      if (e.positionMillis === e.durationMillis) {
        localSound.sound.stopAsync();
      }
      let percent = Math.floor(
        (e.positionMillis / e.durationMillis) * 100,
      );
      setPercent(percent);
      setTimeElapsed(e.positionMillis / 1000);
      setDuration(e.durationMillis / 1000);
    });

    setSound(localSound);

    await Promise.all([localSound.sound.playAsync(), localSound.sound.setVolumeAsync(1.0)]);
  };

  const onPausePress = async (e) => {
    setIsPlaying(false);
    setIsAlreadyPlay(false);
    await sound.sound.pauseAsync();
  };

  const onStopPress = async (e) => {
    setIsPlaying(false);
    await sound.sound.stopAsync();
  };

  const onForward = async () => {
    let curr_track = currentPlaylist[currentMediaPlaylistId];
    let current_index = currentPlaylist.indexOf(curr_track) + 1;
    if (current_index === currentPlaylist.length) {
      setCurrentMediaPlaylistId(0);
    } else {
      setCurrentMediaPlaylistId(currentMediaPlaylistId + 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    let curr_track = currentPlaylist[currentMediaPlaylistId];

    let current_index = currentPlaylist.indexOf(curr_track);

    if (current_index === 0) {
      setCurrentMediaPlaylistId(currentPlaylist.items.length - 1);
    } else {
      setCurrentMediaPlaylistId(currentMediaPlaylistId - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  return (
    <Container>
      <Background>
        <InnerContainer>
          <Header>
            <Name>{currentPlaylist[currentMediaPlaylistId].title}</Name>
            <Button {...{ onPress }}>
              <Icon name="chevron-down" color="white" size={24} />
            </Button>
          </Header>
          <PodImage source={{ uri: currentPlaylist[currentMediaPlaylistId].previewImage }} />
          <Metadata>
            <PlayerView>
              <TextTicker duration={10000}
                style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{currentPlaylist[currentMediaPlaylistId].title}</TextTicker>
              <PodAuthor>{currentPlaylist[currentMediaPlaylistId].author?.fullName}</PodAuthor>
            </PlayerView>
          </Metadata>
          {/*
          <Slider>
            <Circle>●</Circle>
          </Slider>
          */}

          <View style={styles.seekbar}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              value={percent}
              minimumTrackTintColor="#ffffff"
              onValueChange={(p) => changeTime(p)}
            />
            <View style={styles.inprogress}>
              <Text style={[styles.textLight, styles.timeStamp]}>
                {!inprogress
                  ? timeElapsed
                  : audioRecorderPlayer.mmss(Math.floor(timeElapsed))}
              </Text>
              <Text style={[styles.textLight, styles.timeStamp]}>
                {!inprogress
                  ? duration
                  : audioRecorderPlayer.mmss(Math.floor(duration))}
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
            <AntDesign onPress={() => !isAlreadyPlay ? onStartPress() : onPausePress()} name={!isAlreadyPlay ? 'play' : 'pause'} color="white" size={54} />
            <AntDesign
              name="stepforward"
              color={currentMediaPlaylistId < currentPlaylist.length - 1 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'}
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
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: { alignItems: 'center', marginTop: 32 },
});
