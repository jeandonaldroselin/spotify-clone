import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Item from '~/components/Item';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

import {
  Container,
  Title,
  PlayList,
  TextAvatar,
  Avatar
} from './styles';

export default function Account() {
  const [sessions, setSessions] = useState([]);
  const [assistance, setAssistance] = useState("assistance@editions-charisma.fr");
  
  useEffect(() => {
    async function loadSessions() {
      const { data } = await api.get('sessions');
      setSessions(data);
    }
    loadSessions();
  }, []);

  return (
    <Container>
       <Title> Compte</Title>
       {/* <View style={{ display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'center',paddingLeft:0, margin:15 }}> */}

       <View style={{ display:'flex', flexDirection:'row', alignItems:'center',paddingLeft:0, margin:15 }}>
      <Avatar
        source={{
          uri:
            'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        }}
        borderRadius={50}
        size='giant'
      />
      <TextAvatar>
        Mathieu D.
      </TextAvatar>
    </View>
    <PlayList>
          <Item name='Nom' value='Goureige'/>
          <Item name='Adresse email' value='burdy.gou@gmail.com'/>
          <Item name='Mot de passe' value='Modifier mot de passe'/>
          <Item name="Player" value={null}/>
          <Item name='Assistance' value='assistance@gmail.com'/>
          <Item name='Consulter la Politique de confidentialité' value={null}/>
          <Item name="Consulter les Conditions Générales d'Utilisation" value={null}/>
          <Item name="Noter l'application Editions Charisma" value={null}/>
          <Item name="Déconnexion" value={null}/>

    </PlayList>
  </Container>
  )
}

