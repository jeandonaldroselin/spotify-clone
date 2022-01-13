import React, { useState, useEffect, Fragment } from 'react';

import api from '~/services/api';

import { Container, ChaptersList, Title } from './styles';
import Chapter from '~/components/DailyChapters/Chapter';

export default function Episodios() {
  const [coffrets, setCoffrets] = useState([]);

  useEffect(() => {
    function loadCoffrets() {
      let body = {
        "startReleaseDate": "1950-01-15",
        "endReleaseDate": (new Date()).toISOString().split('T')[0],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "releaseDate"
      }
      api.post('/media/boxset/find', JSON.stringify(body)).then((response) => {
        const data = response.data.data?.item || response.data.item;
        console.log(data)
        setCoffrets(data);
      })
    }
    loadCoffrets();
  }, []);

  return (
    <Container>
      <ChaptersList>
        {coffrets &&
          coffrets.map(coffret => (
            <Fragment key={coffret.id}>
              <Chapter
                chapter={{
                  time: coffret.duration,
                  title: coffret.title,
                  image: coffret.image,
                  author: coffret.author,
                  description: coffret.description,
                }} />
            </Fragment>
          ))}
      </ChaptersList>
    </Container>
  );
}

Episodios.navigationOptions = {
  tabBarLabel: 'Coffrets',
};
