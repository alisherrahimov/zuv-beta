import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './App';
import LanguageProvider from './src/context/LanguageContext';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

const RNRedux = () => (
  <Provider store={store}>
    <NavigationContainer>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </NavigationContainer>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
