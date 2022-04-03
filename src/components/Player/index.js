import React from 'react';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import MiniPlayer from '~/components/MiniPlayer';
import FullPlayer from '~/components/FullPlayer';

import { ViewTopPlayer } from './styles';

const { Extrapolate } = Animated;
const { height } = Dimensions.get('window');
const TABBAR_HEIGHT = getBottomSpace() + 50;
const MINIMIZED_PLAYER_HEIGHT = 50;
const TOP = 0;
const BOTTOM = - (TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT -2);
const BOTTOM_ABSOLUTE = height;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

export default function Player({ navigation }) {
  const translationY = useSharedValue(BOTTOM_ABSOLUTE);

  const minimisePlayer = () => {
    translationY.value = withSpring(BOTTOM_ABSOLUTE, config);
  }

  const goToDetails = (playlist) => {
    minimisePlayer();
    navigation.navigate('Details', { data: buildPlaylistObjectForDetails(playlist), isAuthor: false });
  }

  const buildPlaylistObjectForDetails = (playlist) => {
    const media = playlist.items[0];
    return {
      ...playlist,
      previewImage: media?.previewImage,
      author: media.author
    }
  }


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
    },
    onActive: (event, ctx) => {
      translationY.value = ctx.startY + event.translationY;
    },
    onEnd: (_, ctx) => {
      let target = ctx.startY;
      const isBottomTarget = _.velocityY > 500;
      const isTopTarget = _.velocityY < -500;
      if (isBottomTarget) {
        target = BOTTOM_ABSOLUTE;
      } else if (isTopTarget) {
        target = TOP;
      }
      translationY.value = withSpring(target, config);
    },
  });

  const translationYAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  });

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translationY.value, [BOTTOM_ABSOLUTE - MINIMIZED_PLAYER_HEIGHT, BOTTOM_ABSOLUTE], [0, 1], Extrapolate.CLAMP);
    return {
      opacity
    };
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <ViewTopPlayer style={translationYAnimatedStyle}>
          <FullPlayer onChevronDownPress={minimisePlayer} onTitlePress={goToDetails} />
          {/*           <ViewBottomPlayer
            style={{
              opacity: overlayOpacity,
              backgroundColor: '#272829',
            }}
            pointerEvents="none"
          /> */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: BOTTOM,
                left: 0,
                right: 0,
                height: MINIMIZED_PLAYER_HEIGHT,
              }, opacityAnimatedStyle]}
          >
            <MiniPlayer />
          </Animated.View>
        </ViewTopPlayer>
      </PanGestureHandler>
    </>
  );
}
