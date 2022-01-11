import React, { useState, useEffect, useContext } from 'react';

import api from '../../../services/api';

import Input from '~/components/Input';

import {
  Container,
  ScrollView,
  Title,
  SubTitle,
  InputContainer,
  SessionList,
  Session,
  SessionImage,
  SessionTitle,
} from './styles';
import { AuthenticationContext } from '~/context/authentication.context';

export default function Search() {
  const [sessions, setSessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const { accessToken } = useContext(AuthenticationContext);

  useEffect(() => {
    async function loadSessions() {

      const headers = {
        "Authorization": "Bearer " + accessToken
      };

      let body = {
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "releaseDate",
        "sortDirection": "DESC"
      };
      console.info('accessToken: ', accessToken)
      const { data } = await api.get('/media/category/find', { headers, body: JSON.stringify(body) });
      setCategories(data);
    }
    loadSessions();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Title>Recherche</Title>
        <InputContainer>
          <Input placeholder="Mots-clés, prédicateurs, titres...                     x" />
        </InputContainer>
        <SubTitle>Rechercher par thèmes</SubTitle>

        {/* <SessionList>
          {sessions &&
            sessions.map(session => (
              <Session key={session.title} background={session.background}>
                <SessionImage source={{ uri: session.image }} />
                <SessionTitle>{session.title}</SessionTitle>
              </Session>
            ))}
        </SessionList> */}
        <SessionList
          data={sessions}
          keyExtractor={item => String(item.title)}
          renderItem={({ item }) => (
            <Session background={item.background}>
              <SessionImage source={{ uri: item.image }} />
              <SessionTitle>{item.title}</SessionTitle>
            </Session>
          )}
        />
      </ScrollView>
    </Container>
  );
}
