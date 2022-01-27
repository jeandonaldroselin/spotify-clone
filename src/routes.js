import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '~/pages/public/Login';
import PrivateStack from './pages/private/PrivateApp';

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
