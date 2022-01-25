import { StatusBar } from 'react-native';
import Player from '~/components/Player';
import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import Main from '~/pages/private/Main';
import Search from '~/pages/private/Search';
import Playlists from '~/pages/private/Library/Music/Playlists';
import Artists from '~/pages/private/Library/Music/Artists';
import Albums from '~/pages/private/Library/Music/Albums';
import Coffrets from '~/pages/private/Library/PodCasts/Coffrets';

import Downloads from '~/pages/private/Library/PodCasts/Downloads';
import Programs from '~/pages/private/Library/PodCasts/Programs';
import Predications from '~/pages/private/Library/PodCasts/Predications';
import Predicator from '~/pages/private/Library/PodCasts/Predicator';
import Account from '~/pages/private/Account';
import Login from '~/pages/public/Login';


import { createAppContainer } from 'react-navigation';
import { PlayerContext } from '~/context/player.context';
import api from '~/services/api';
import { AuthenticationContext } from '~/context/authentication.context';
import axios from 'axios';

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
                                    Coffrets,
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
                                            backgroundColor: '#ff9600',
                                        },
                                    },
                                }
                            ),
                            // Musica: createMaterialTopTabNavigator(
                            //     {
                            //         Playlists,
                            //         Artists,
                            //         Albums,
                            //     },
                            //     {
                            //         navigationOptions: {
                            //             tabBarLabel: 'Musique',
                            //         },
                            //         tabBarOptions: {
                            //             scrollEnabled: true,
                            //             activeTintColor: 'white',
                            //             inactiveTintColor: '#999',
                            //             upperCaseLabel: false,
                            //             labelStyle: {
                            //                 fontWeight: 'bold',
                            //                 fontSize: 14,
                            //             },
                            //             style: {
                            //                 backgroundColor: '#121212',
                            //             },
                            //             tabStyle: {
                            //                 width: 90,
                            //             },
                            //             indicatorStyle: {
                            //                 backgroundColor: '#00e868',
                            //             },
                            //         },
                            //     }
                            // ),
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
                                    paddingTop: Platform.OS === 'ios' ? 45 : 15,
                                    paddingLeft: Platform.OS === 'ios' ? 0 : 10
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
        ['Mon compte']: {
            screen: createStackNavigator(
                {
                    Account,
                },
                {
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Feather name="user" size={24} color={tintColor} />
                        ),
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

const PrivateRoutes = createAppContainer(PrivateStack);

export default function PrivateApp(props) {
    const [currentMediaPlaylistId, setCurrentMediaPlaylistId] = useState(-1);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        AsyncStorage.setItem('@accessToken', accessToken);
        api.interceptors.request.use(config => {
            if (!config?.headers?.Authorization) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return { ...config }
        })
    }, [])

    const setCurrentPlaylistAndMedia = (playlist, startMediaId = 0) => {
        setCurrentPlaylist(playlist);
        setCurrentMediaPlaylistId(startMediaId);
    }

    return (
        <PlayerContext.Provider value={{ currentMediaPlaylistId, setCurrentMediaPlaylistId, currentPlaylist, setCurrentPlaylist: setCurrentPlaylistAndMedia }}>
            <StatusBar barStyle="light-content" backgroundColor="#111" />
            <PrivateRoutes />
            {currentPlaylist?.length > 0 && <Player />}
        </PlayerContext.Provider>
    )
}