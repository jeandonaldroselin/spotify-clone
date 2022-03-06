import React, { useContext} from 'react';

import { Container, PlayList , ImageContainer,Image, TitleContainer,Title,SubTitle,} from './styles';

import { BackHandler } from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';

export default function Details({navigation}) {
  const coffret = navigation.state.params;
  const medias = navigation.state.params.items;

  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",() => {
    navigation.pop();
  });
  const onMediaPress = (media) => {
    setCurrentPlaylist(coffret.items, media.track - 1);
  };

  return (
  <Container>
  <ImageContainer>
    <Image source={{ uri: coffret.previewImage || coffret.image }} />
  </ImageContainer>
 <TitleContainer>
    <Title>{coffret.title || coffret.fullNAme}</Title>
    <SubTitle>{coffret.author?.fullNAme || 'Auteur inconnu'}</SubTitle>
    <SubTitle>{coffret.duration }</SubTitle>
  </TitleContainer> 
 <PlayList>
  {medias &&
    medias.map((media, index) => (
      <Program key={index} program={media}  onPress={() => onMediaPress(media)} />
    ))} 
</PlayList>  
</Container>
  );
}
