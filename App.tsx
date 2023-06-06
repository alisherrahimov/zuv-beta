import React from 'react';

import AxiosProvider from './src/context/AxiosContext';

import {Platform, StatusBar, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './src/helpers/toastConfig';
import Navigation from './src/navigation/Navigation';

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('light-content', true);
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
}

function App() {
  return (
    <View style={{flex: 1}}>
      <>
        <AxiosProvider>
          <Navigation />
        </AxiosProvider>
      </>
      <Toast config={toastConfig} />
    </View>
  );
}

export default App;
