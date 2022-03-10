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
    isArray ?
    setCurrentPlaylist(coffret[0].items, media.track - 1) :
    setCurrentPlaylist(coffret.items, media.track - 1);
  }

  return (
    <>
    {!isArray ? 
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
  {navigation.state.params.items &&
    navigation.state.params.items.map((media, index) => (
      <Program key={index} program={media}  onPress={() => onMediaPress(media)} />
    ))} 
</PlayList>  
</Container>
     :
    <Container>
    <ImageContainer>
    <Image source={{ uri: coffret[0]?.previewImage || coffret[0]?.image }} />
  </ImageContainer>
   <TitleContainer>
      <Title>{coffret[0]?.title || coffret[0]?.fullName}</Title>
      {/* <SubTitle>{coffret[0].author || 'Auteur inconnu'}</SubTitle> */}
      <SubTitle>{coffret[0]?.duration }</SubTitle>
    </TitleContainer> 
   <PlayList>
    {navigation.state.params[0]?.items &&
      navigation.state.params[0]?.items.map((media, index) => (
        <Program key={index} program={media}  onPress={() => onMediaPress(media)} />
      ))} 
  </PlayList>  
</Container>
    }

  


</>
  );
}
