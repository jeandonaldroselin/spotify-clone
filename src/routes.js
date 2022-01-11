import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '~/pages/public/Login';
import PrivateApp from './pages/private/PrivateApp';

const Routes = createAppContainer(createSwitchNavigator(
  {
    Auth: Login,
    App: PrivateApp,
  },
  {
    initialRouteName: 'Auth'
  }
));

export default Routes;
