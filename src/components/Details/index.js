import React, { useContext} from 'react';

import { Container, PlayList ,Arrow, ImageContainer,Image, TitleContainer,Title,SubTitle,ImageContainerAuthor, ImageAuthor, TitleContainerAuthor,SubTitleAuthor,TitleAuthor} from './styles';

import { BackHandler , Text, TouchableOpacity} from 'react-native';
import Program from '~/components/Program';
import { PlayerContext } from '~/context/player.context';
import { AntDesign } from '@expo/vector-icons';
export default function Details({navigation}) {
  const data = navigation.state.params.data;
  const medias = data.items;
  const isAuthor = navigation.state.params.isAuthor;
  const { setCurrentPlaylist } = useContext(PlayerContext);
  const backHandler = BackHandler.addEventListener("hardwareBackPress",() => {
    goBack();
  });
  const onMediaPress = (media) => {
    if (media.playUrl.length > 0) {
      setCurrentPlaylist(data, medias.indexOf(media));
    }
  };

  function goBack() {
    navigation.pop();
  }
  return (
    !isAuthor ?

  <Container>
    <TouchableOpacity onPress={() => goBack()}>
      <Arrow>
        <AntDesign name="arrowleft" size={30} color="white" />
       </Arrow>
      </TouchableOpacity>

  <ImageContainer>
    <Image source={{ uri: data.previewImage || data.image }} />
  </ImageContainer>
 <TitleContainer>
    <Title>{data.title}</Title>
    <SubTitle>{data.author?.fullName || 'Auteur inconnu'}</SubTitle>
  </TitleContainer> 
 <PlayList>
  {medias &&
    medias.map((media, index) => (
      <Program key={index} program={media}  onPress={() => onMediaPress(media)} />
    ))} 
</PlayList>  
</Container>
:
<Container>
<TouchableOpacity onPress={() => goBack()}>
      <Arrow>
        <AntDesign name="arrowleft" size={30} color="white" />
       </Arrow>
      </TouchableOpacity>
<ImageContainerAuthor>
  <ImageAuthor source={{ uri: data.previewImage || data.image }} />
</ImageContainerAuthor>
<TitleContainerAuthor>
  <TitleAuthor>{ data.items[0]?.album.name}</TitleAuthor>
  <SubTitleAuthor>{data.fullName || 'Auteur inconnu'}</SubTitleAuthor>
</TitleContainerAuthor> 
<PlayList>
{medias &&
  medias.map((media, index) => (
    <Program key={index} program={media}  onPress={() => onMediaPress(media)} />
  ))} 
</PlayList>  
</Container>
  );
}
