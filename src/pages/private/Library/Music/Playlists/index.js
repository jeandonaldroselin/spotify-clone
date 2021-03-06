import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import api from '~/services/api';

import {
  Container,
  PlayList,
  Item,
  ImageContainer,
  Image,
  TextContainer,
  ItemText,
  ItemSubText,
} from './styles';

export default function Playlists() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function loadProfile() {
      const { data } = await api.get('profile');
      setProfile(data);
    }
    loadProfile();
  }, []);

  return (
    <Container>
      <PlayList>
        <Item>
          <ImageContainer>
            <Feather name="plus" size={24} color="#eee" />
          </ImageContainer>
          <ItemText>Créer une playlist</ItemText>
        </Item>
        <Item>
          <ImageContainer>
            <Image source={{ uri: profile && profile.image }} />
          </ImageContainer>
          <TextContainer>
            <ItemText>Découvertes de la semaine</ItemText>
            <ItemSubText>Créée par {profile && profile.name}</ItemSubText>
          </TextContainer>
        </Item>
      </PlayList>
    </Container>
  );
}
