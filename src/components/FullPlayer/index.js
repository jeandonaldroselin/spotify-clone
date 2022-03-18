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
  const [duration, setDuration] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [percent, setPercent] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const { currentPlaylist, currentMediaPlaylistId, setCurrentMediaPlaylistId, setIsPlaying, isPlaying, setSound, sound } = useContext(PlayerContext);

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
    await sound.sound.setPositionAsync(seektime)
  };

  const _onPlaybackStatusUpdate = (status) => {
    if (!status?.positionMillis || !status?.durationMillis) {
      return;
    }

    if (status.positionMillis === status.durationMillis) {
      sound?.sound.stopAsync();
    }
    let percent = Math.floor(
      (status.positionMillis / status.durationMillis) * 100,
    );
    
    setPercent(percent);
    setTimeElapsed(status.positionMillis);
    setDuration(status.durationMillis);
  };

  const onStartPress = async () => {
    setIsPlaying(true);
    setInprogress(true);
    const path = currentPlaylist.items[currentMediaPlaylistId].playUrl;
    try {
      if (sound?.sound) {
        const status = await sound.sound.getStatusAsync();
        if (path.includes(status.uri)) { // Here we know the sound is just paused
          await sound.sound.playAsync();
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });

      if (sound?.sound) {
        await sound.sound.unloadAsync();
      }
      const localSound = await Audio.Sound.createAsync({ uri: path });
      
      localSound.sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      setSound(localSound);

      await Promise.all([localSound.sound.playAsync(), localSound.sound.setVolumeAsync(1.0)]);
    }
    catch (e) {
      console.error(e)
    }
  };

  const onPausePress = async (e) => {
    setIsPlaying(false);
    await sound.sound.pauseAsync();
  };

  const onStopPress = async (e) => {
    setIsPlaying(false);
    await sound.sound.stopAsync();
  };

  const onForward = async () => {
    if (currentMediaPlaylistId >= currentPlaylist.items?.length - 1) {
      return;
    }

    let current_index = currentMediaPlaylistId + 1;
    if (current_index === currentPlaylist.items?.length) {
      setCurrentMediaPlaylistId(0);
    } else {
      setCurrentMediaPlaylistId(current_index);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    if (currentMediaPlaylistId === 0) {
      return;
    }

    let current_index = currentMediaPlaylistId;
    if (current_index === 0) {
      setCurrentMediaPlaylistId(currentPlaylist.items?.length - 1);
    } else {
      setCurrentMediaPlaylistId(current_index - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

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
                {!inprogress
                  ? timeElapsed
                  : msToTime(Math.floor(timeElapsed))}
              </Text>
              <Text style={[styles.textLight, styles.timeStamp]}>
                {!inprogress
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
            <AntDesign onPress={() => !isPlaying ? onStartPress() : onPausePress()} name={!isPlaying ? 'play' : 'pause'} color="white" size={54} />
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
