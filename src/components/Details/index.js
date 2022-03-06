import React, { useContext} from 'react';

import { Container, PlayList , ImageContainer,Image, TitleContainer,Title,SubTitle,} from './styles';

import { BackHandler } from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';

export default function CoffretDetails({navigation}) {
  const isArray = Array.isArray(navigation.state.params)
  const coffret = navigation.state.params
  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",() => {
    navigation.pop();
  });
  const onMediaPress = (media) => {
    const items = isArray ? coffret[0].items : coffret.items;
    const mediaIndex = items.indexOf(media);
    setCurrentPlaylist(items, mediaIndex);
  }

  return (
  <Container>
  <ImageContainer>
    <Image source={{ uri: coffret.previewImage || coffret.image }} />
  </ImageContainer>
 <TitleContainer>
    <Title>{coffret.title || coffret.fullName}</Title>
    <SubTitle>{coffret.author.fullName || 'Auteur inconnu'}</SubTitle>
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
