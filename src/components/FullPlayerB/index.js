import React, { useState } from 'react';
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
//import RNFetchBlob from 'rn-fetch-blob';
import PlayButton from './PlayButton';
import * as FileSystem from 'expo-file-system';
import { Audio, Video } from 'expo-av';

//let dirs = RNFetchBlob.fs.dirs.DocumentDir;
const dirs = FileSystem.documentDirectory;

const playlist = [
  {
    title: 'death bed',
    path: 'https://sample-music.netlify.app/death%20bed.mp3',
    cover:
      'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'bad liar',
    path: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
    cover:
      'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'faded',
    path: 'https://sample-music.netlify.app/Faded.mp3',
    cover:
      'https://images.unsplash.com/photo-1512036666432-2181c1f26420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
  {
    title: 'hate me',
    path: 'https://sample-music.netlify.app/Hate%20Me.mp3',
    cover:
      'https://images.unsplash.com/photo-1501761095094-94d36f57edbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80',
  },
  {
    title: 'Solo',
    path: 'https://sample-music.netlify.app/Solo.mp3',
    cover:
      'https://images.unsplash.com/photo-1471400974796-1c823d00a96f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
];

export default function FullPlayerB() {
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [sound, setSound] = React.useState();

  const changeTime = async (seconds) => {
    if(!sound) {
      return false;
    }
    // 50 / duration
    let seektime = (seconds / 100) * duration;
    setTimeElapsed(seektime);
    await sound.sound.setPositionAsync(seconds/1000)
  };

  /*React.useEffect(() => {
    return sound && sound.sound
      ? () => {
        console.log('Unloading Sound');
        try {
          sound.sound.unloadAsync();
        } catch (e) {
          console.log('an error has occurend when unloading', e);
        }
      }
      : undefined;
  }, [sound]);*/

  const onStartPress = async (e) => {
    setisAlreadyPlay(true);
    setInprogress(true);
    const path = playlist[current_track].path;

    const localSound = await Audio.Sound.createAsync({ uri: path });

    localSound.sound.setOnPlaybackStatusUpdate((e) => {
      if (!e) {
        return;
      }

      if (e.positionMillis === e.durationMillis) {
        localSound.sound.stopAsync();
      }
      let percent = Math.floor(
        (Math.floor(e.positionMillis) / Math.floor(e.durationMillis)) * 100,
      );
      setPercent(percent);
      setTimeElapsed(e.positionMillis / 1000);
      setDuration(e.durationMillis / 1000);
    });

    setSound(localSound);

    await Promise.all([localSound.sound.playAsync(), localSound.sound.setVolumeAsync(1.0)]);
  };

  const onPausePress = async (e) => {
    setisAlreadyPlay(false);
    await sound.sound.pauseAsync();
  };

  const onStopPress = async (e) => {
    await sound.sound.stopAsync();
  };

  const onForward = async () => {
    let curr_track = playlist[current_track];
    let current_index = playlist.indexOf(curr_track) + 1;
    if (current_index === playlist.length) {
      setCurrentTrack(1);
    } else {
      setCurrentTrack((current_track) => current_track + 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    let curr_track = playlist[current_track];

    let current_index = playlist.indexOf(curr_track);

    if (current_index === 0) {
      setCurrentTrack(5);
    } else {
      setCurrentTrack((current_track) => current_track - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textLight, { fontSize: 12 }]}>PLAYLIST</Text>
          <Text style={styles.text}>Instaplayer</Text>
        </View>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: playlist[current_track].cover,
            }}
            style={styles.cover}
          />
        </View>

        <View style={styles.trackname}>
          <Text style={[styles.textDark, { fontSize: 20, fontWeight: '500' }]}>
            {playlist[current_track].title}
          </Text>
        </View>
      </View>
      <View style={styles.seekbar}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={percent}
          minimumTrackTintColor="#19D648"
          onValueChange={(seconds) => changeTime(seconds)}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onBackward()}>
          <FontAwesome name="backward" size={32} color="#93A8B3" />
        </TouchableOpacity>
        {!isAlreadyPlay ? (
          <PlayButton function={() => onStartPress()} state="play" />
        ) : (
          <PlayButton function={() => onPausePress()} state="pause" />
        )}
        <TouchableOpacity onPress={() => onForward()}>
          <FontAwesome name="forward" size={32} color="#93A8B3" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#19D648',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  seekbar: { margin: 32 },
  inprogress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: { alignItems: 'center', marginTop: 32 },
});
