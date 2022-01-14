import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import api from '~/services/api';

import { Container, Predicator, PredicatorImage, PredicatorName } from './styles';

export default function Artists() {
  const [currentPredicator, setCurrentPredicator] = useState(null);
  const [predicators, setPredicators] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress",
      () => {
        setCurrentPredicator(null);
        return true;
      });
    function loadPredicators() {
      let body = {
        "section": ["predication"],
        "page": 1,
        "resultPerPage": 20,
        "sortBy": "fullname"
      }
      api.post('/media/author/find', JSON.stringify(body)).then((response) => {
        const data = response.data.data?.item || response.data.item;
        setPredicators([{
          "id": 0,
          "fullName": "Example author",
          "description": "",
          "image": "https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg",
          "section": ["predication"]
        }, {
          "id": 1,
          "fullName": "Example author",
          "description": "",
          "image": "https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg",
          "section": ["predication"]
        }, {
          "id": 2,
          "fullName": "Example author",
          "description": "",
          "image": "https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg",
          "section": ["predication"]
        }, {
          "id": 3,
          "fullName": "Example author",
          "description": "",
          "image": "https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg",
          "section": ["predication"]
        }, {
          "id": 4,
          "fullName": "Example author",
          "description": "",
          "image": "https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?size=626&ext=jpg",
          "section": ["predication"]
        }]);
      })
    }
    loadPredicators();
    return () => backHandler.remove();
  }, []);

  return (
    <Container>
      {predicators && predicators.map(predicator => (
        <Predicator key={predicator.id}>
          <PredicatorImage source={{ uri: predicator.image }}></PredicatorImage>
          <PredicatorName>{predicator.fullName}</PredicatorName>
        </Predicator>
      ))}
    </Container>
  );
}

Artists.navigationOptions = {
  tabBarLabel: 'Prédicateur',
};
