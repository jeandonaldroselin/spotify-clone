import React, { useState, useEffect, useContext } from 'react';

import api from '../../../services/api';
import Item from '~/components/Item';
import { View, TouchableOpacity,Image } from 'react-native';
import { AuthenticationContext } from '~/context/authentication.context';
import { PlayerContext } from '~/context/player.context';

import {
  Container,
  Title,
  PlayList,
  TextAvatar,
  Avatar
} from './styles';
import { Linking } from 'react-native';
import Login from '~/pages/public/Login';

export default function Account({navigation}) {
  const { setIsAuthenticated, setAccessToken, setRefreshToken,isAuthenticated , accessToken, refreshToken } = useContext(AuthenticationContext);

  const [sessions, setSessions] = useState([]);
  const [assistance, setAssistance] = useState("assistance@editions-charisma.fr");
  const [ user, setUser ] = useState(null);

  function logout() {
    api.post('/logout').then(res => {
      setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
        console.log(navigation);
        navigation.navigate('Login');

    })
  }

  useEffect(() => {
    async function loadSessions() {
      const { data } = await api.get('sessions');
      setSessions(data);
    }
    async function getUserInfo() {
      api.get('/userinfo').then(infoUser => {
        setUser(infoUser.data);
      })
    }
  
    getUserInfo();
   
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
        { user?.firstname }
      </TextAvatar>
    </View>
    <PlayList>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.editions-charisma.fr/authentification?back=my-account')}> 
           <Item value='Adresse email' caption={user?.email}/>
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => Linking.openURL('https://www.editions-charisma.fr/authentification?back=my-account')}>
        <Item value='Mot de passe' caption='Modifier mot de passe'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.editions-charisma.fr/coordonnees')}>
        <Item value='Assistance'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.editions-charisma.fr/content/10-conditions-generales-de-vente')}>
        <Item  value='Consulter la Politique de confidentialité' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.editions-charisma.fr/content/10-conditions-generales-de-vente')}>
        <Item value="Consulter les Conditions Générales d'Utilisation" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => logout() }>
        <Item value="Déconnexion" />
        </TouchableOpacity>

    </PlayList>
  </Container>
  )
}

