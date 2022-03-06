import React, { useContext} from 'react';

import { Container, PlayList , ImageContainer,Image, TitleContainer,Title,SubTitle,} from './styles';

import { BackHandler } from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';

export default function Details({navigation}) {
  const data = navigation.state.params;
  const medias = navigation.state.params.items;

  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",() => {
    navigation.pop();
  });
  const onMediaPress = (media) => {
    const mediaIndex = items.indexOf(media);
    setCurrentPlaylist(data.items, media.track - 1);
  };

  return (
  <Container>
  <ImageContainer>
    <Image source={{ uri: data.previewImage || data.image }} />
  </ImageContainer>
 <TitleContainer>
    <Title>{data.title || data.fullNAme}</Title>
    <SubTitle>{data.author?.fullNAme || data.fullNAme || 'Auteur inconnu'}</SubTitle>
    <SubTitle>{data.duration }</SubTitle>
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
