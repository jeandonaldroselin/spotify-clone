import React, { useState, useEffect } from 'react';

import api from '../../services/api';

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

export default function Search() {
  const [sessions, setSessions] = useState([]);
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    async function loadSessionList() {
      const { sessionsBBData } = await api.get('sessionsBB');
      setSessionList(sessionsBBData);
    }
    async function loadSessions() {
      const { data } = await api.get('sessions');
      setSessions(data);
    }
    loadSessions();
    loadSessionList();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Title>Recherche</Title>
        <InputContainer>
          <Input placeholder="Artiste, invité ou titre de predication" />
        </InputContainer>
        <SubTitle>Navegar por todas as seções</SubTitle>

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
