import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Feather,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import Main from '~/pages/Main';
import Search from '~/pages/Search';
import Playlists from '~/pages/Library/Music/Playlists';
import Artists from '~/pages/Library/Music/Artists';
import Albums from '~/pages/Library/Music/Albums';
import Episodios from '~/pages/Library/PodCasts/Episodios';
import Downloads from '~/pages/Library/PodCasts/Downloads';
import Programs from '~/pages/Library/PodCasts/Programs';
import Predications from '~/pages/Library/PodCasts/Predications';
import Predicator from '~/pages/Library/PodCasts/Predicator';
import Premium from '~/pages/Premium';
import Login from '~/pages/Login';
import Player from './components/Player';

const PrivateStack = createBottomTabNavigator(
  {
    Explorer: {
      screen: createStackNavigator(
        {
          Main: {
            screen: Main,
          },
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <MaterialIcons name="home" size={24} color={tintColor} />
            ),
          },
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
    },
    Rechercher: {
      screen: createStackNavigator(
        {
          Search,
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Feather name="search" size={24} color={tintColor} />
            ),
          },
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
    },
    Library: {
      screen: createStackNavigator(
        {
          screen: createMaterialTopTabNavigator(
            {
              Podcasts: createMaterialTopTabNavigator(
                {
                  Predications,
                  Episodios,
                  Predicator/*,
                  Downloads,
                  Programs,*/
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Prédication',
                  },
                  tabBarOptions: {
                    activeTintColor: 'white',
                    inactiveTintColor: '#999',
                    upperCaseLabel: false,
                    labelStyle: {
                      fontWeight: 'bold',
                    },
                    tabStyle: {
                      width: 90,
                      padding: 0,
                      margin: 0,
                      textAlign: 'Left',
                    },
                    style: {
                      backgroundColor: '#121212',
                    },
                    indicatorStyle: {
                      backgroundColor: '#00e868',
                    },
                  },
                }
              ),
              Musica: createMaterialTopTabNavigator(
                {
                  Playlists,
                  Artists,
                  Albums,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Musique',
                  },
                  tabBarOptions: {
                    scrollEnabled: true,
                    activeTintColor: 'white',
                    inactiveTintColor: '#999',
                    upperCaseLabel: false,
                    labelStyle: {
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                    style: {
                      backgroundColor: '#121212',
                    },
                    tabStyle: {
                      width: 90,
                    },
                    indicatorStyle: {
                      backgroundColor: '#00e868',
                    },
                  },
                }
              ),
            },
            {
              tabBarOptions: {
                scrollEnabled: true,
                activeTintColor: 'white',
                inactiveTintColor: '#999',
                upperCaseLabel: false,
                labelStyle: {
                  fontWeight: 'bold',
                  fontSize: 29,
                },
                indicatorStyle: {
                  backgroundColor: '#121212',
                },
                tabStyle: {
                  width: 170,
                  padding: 0,
                  margin: 0,
                  textAlign: 'Left',
                },
                style: {
                  backgroundColor: '#121212',
                  paddingTop: Platform.OS === 'ios' ? 45 : 0,
                },
              },
            },
            {
              navigationOptions: {},
            }
          ),
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome name="book" size={24} color={tintColor} />
            ),
            tabBarLabel: 'Bibliothèque',
          },
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
    },
    /*Premium: {
      screen: createStackNavigator(
        {
          Premium,
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome name="spotify" size={24} color={tintColor} />
            ),
          },
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
    },*/
  },
  {
    navigationOptions: {
      initialRouteName: 'Library',
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#999',
      style: {
        backgroundColor: '#272829',
        borderTopColor: '#010101',
        borderTopWidth: 2,
      },
    },
  }
)

const Routes = createAppContainer(createSwitchNavigator(
  {
    Auth: Login,
    App: PrivateStack,
  },
  {
    initialRouteName: 'Auth'
  }
));

export default Routes;
