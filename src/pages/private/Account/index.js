import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import Item from '~/components/Item';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

import {
  Container,
  Title,
  PlayList,
  TextAvatar,
  Avatar
} from './styles';
import { Linking } from 'react-native';

export default function Account() {
  const [sessions, setSessions] = useState([]);
  const [assistance, setAssistance] = useState("assistance@editions-charisma.fr");
  const [ user, setUser ] = useState(null);
 
  useEffect(() => {
    async function loadSessions() {
      const { data } = await api.get('sessions');
      setSessions(data);
    }
    async function getUserInfo() {
      api.get('/userinfo').then(infoUser => {
        setUser(infoUser.data);
        console.log()
      })
    }
  
    getUserInfo()
   
    loadSessions();
  }, []);

  return (
    <Container>
       <Title>Compte</Title>
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
        { user.firstname }
      </TextAvatar>
    </View>
    <PlayList>
          <Item url="https://www.editions-charisma.fr/authentification?back=my-account" name='Adresse email' value={user.email}/>
          <Item url="https://www.editions-charisma.fr/authentification?back=my-account" name='Mot de passe' value='Modifier mot de passe'/>
          <Item name='Assistance' url='https://www.editions-charisma.fr/coordonnees' />
          <Item url="https://www.editions-charisma.fr/content/10-conditions-generales-de-vente" name='Consulter la Politique de confidentialité' />
          <Item url="https://www.editions-charisma.fr/content/10-conditions-generales-de-vente" name="Consulter les Conditions Générales d'Utilisation" />
          <Item name="Déconnexion" />

    </PlayList>
  </Container>
  )
}

