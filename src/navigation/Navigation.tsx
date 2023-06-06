import React, {useEffect, useState} from 'react';

import useLanguage from '../hooks/useLanguage';
import {
  ActiveAdsScreen,
  AdScreen,
  AddEmptyScreen,
  AddScreen,
  CodeVerifyScreen,
  CompletedAdsScreen,
  HelpScreen,
  HomeScreen,
  LanguageScreen,
  NotificationScreen,
  PhoneNumberScreen,
  ProfileEditScreen,
  ProfileScreen,
  RegisterScreen,
  SavesScreen,
  WelcomeScreen,
} from '../screens';
import {
  HeartIcon,
  HomeIcon,
  Logo,
  NotificationIcon,
  PlusBorderIcon,
  ProfileIcon,
} from '../assets/icons';
import {colors} from '../helpers/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './BottomTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../redux/types/types';

import {StyleSheet, View} from 'react-native';
import EditAds from '../screens/EditAds';
import {getStorage, getToken} from '../helpers/dataStorage';
import PhoneNumberEdit from '../screens/PhoneNumberEdit';

const BottomTab = createBottomTabNavigator();
const StackNavigator = createStackNavigator<RootStackParamList>();
function Navigation() {
  let token = getToken();
  const [splash, setSplash] = useState(true);
  const [first, setFirst] = useState(false);
  useEffect(() => {
    let key = getStorage('1');

    if (key === null) {
      setFirst(true);
    } else {
      setFirst(false);
    }
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);
  if (splash) {
    return <SplashScreen />;
  }
  console.log(token);
  return (
    <StackNavigator.Navigator
      initialRouteName={
        token === null && first === true ? 'WelcomeScreen' : 'BottomNavigator'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigator.Screen
        name="BottomNavigator"
        component={BottomNavigator}
      />
      <StackNavigator.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
      />
      <StackNavigator.Screen
        name="CodeVerifyScreen"
        component={CodeVerifyScreen}
      />
      <StackNavigator.Screen name="RegisterScreen" component={RegisterScreen} />
      <StackNavigator.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <StackNavigator.Screen name="LanguageScreen" component={LanguageScreen} />
      <StackNavigator.Screen name="AddScreen" component={AddScreen} />
      <StackNavigator.Screen name="EditAds" component={EditAds} />
      <StackNavigator.Screen name="AdScreen" component={AdScreen} />
      <StackNavigator.Screen name="HelpScreen" component={HelpScreen} />
      <StackNavigator.Screen
        name="PhoneNumberEdit"
        component={PhoneNumberEdit}
      />
      <StackNavigator.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
      />
      <StackNavigator.Screen
        name="CompletedAdsScreen"
        component={CompletedAdsScreen}
      />
      <StackNavigator.Screen
        name="ActiveAdsScreen"
        component={ActiveAdsScreen}
      />
    </StackNavigator.Navigator>
  );
}
function BottomNavigator() {
  const translate = useLanguage();

  return (
    <BottomTab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: colors.red['500'],
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate('main'),
          tabBarIcon: HomeIcon,
        }}
      />
      <BottomTab.Screen
        name="Saves"
        component={SavesScreen}
        options={{
          tabBarLabel: translate('saves'),
          tabBarIcon: HeartIcon,
        }}
      />
      <BottomTab.Screen
        name="AddEmpty"
        component={AddEmptyScreen}
        options={{
          tabBarLabel: translate('add'),
          tabBarIcon: PlusBorderIcon,
        }}
      />
      <BottomTab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: translate('notification'),
          tabBarIcon: NotificationIcon,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('profile'),
          tabBarIcon: ProfileIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};
export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
