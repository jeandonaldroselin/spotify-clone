import { useContext } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '~/pages/public/AuthLoadingScreen';
import Login from '~/pages/public/Login';
import PrivateStack from './pages/private/PrivateApp';

const Routes = createAppContainer(createSwitchNavigator(
  {
    AuthLoadingScreen,
    Auth: Login,
    App: PrivateStack,
  },
  {
    initialRouteName: 'AuthLoadingScreen'
  }
));

export default Routes;
