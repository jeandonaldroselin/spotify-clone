import { StatusBar } from 'react-native';
import Player from '~/components/Player';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import {
    BottomTabBar,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import {
    Feather,
    MaterialIcons,
    FontAwesome
} from '@expo/vector-icons';

import Explorer from '~/pages/private/Explorer';
import Search from '~/pages/private/Search';
import Artists from '~/pages/private/Library/Music/Artists';
import Albums from '~/pages/private/Library/Music/Albums';
import Coffrets from '~/pages/private/Library/Predication/Coffrets';
import Details from '~/components/Details' 

import Predications from '~/pages/private/Library/Predication/Predications';
import Predicator from '~/pages/private/Library/Predication/Predicator';
import Account from '~/pages/private/Account';


import { PlayerContext } from '~/context/player.context';

export default PrivateStack = createBottomTabNavigator(
    {
        Explorer: {
            screen: createStackNavigator(
                {
                    Main: {
                        screen: Explorer,
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
                                    Predicator,
                                 /*   Details
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
                                            backgroundColor: '#eda948',
                                        },
                                    },
                                }
                            ),
                            Music: createMaterialTopTabNavigator(
                                {
                                    //Playlists,
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
                                            backgroundColor: '#eda948',
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
                                    paddingTop: Platform.OS === 'ios' ? 45 : 15,
                                    paddingLeft: Platform.OS === 'ios' ? 0 : 10
                                },
                            },
                        },
                        {
                            navigationOptions: {},
                        }
                    ),
                Details: {screen: Details}
                
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
        tabBarComponent: (props) => (
            <PrivateApp {...props}></PrivateApp>
        ),
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

function PrivateApp(props) {
    const { currentPlaylist } = useContext(PlayerContext);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#111" />
            <BottomTabBar {...props} />
            {currentPlaylist?.items?.length > 0 && <Player navigation={props.navigation}/>}
        </>
    )
}
