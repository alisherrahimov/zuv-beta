import React, {useRef} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';

import {colors} from '../helpers/Colors';

import {styles} from './styles';
import CustomText from '../components/Text/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RBSheet from 'react-native-raw-bottom-sheet';
import AdTypeModal from '../components/Modals/AdTypeModal';

import {useAppSelector} from '../hooks/useStore';
import {getToken, storage} from '../helpers/dataStorage';
const {height} = Dimensions.get('screen');
function MyTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  let bottomHeight = useSafeAreaInsets();
  let bottomRef = useRef(null);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          let token = storage.getString('token');
          console.log('token', token?.length);
          onNavigateRoute(
            route.name,
            token,
            navigation,
            route,
            isFocused,
            bottomRef,
          );
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonContainer(bottomHeight.bottom)}>
            <>
              {React.createElement(options.tabBarIcon, {
                color: isFocused ? colors.red[500] : colors.neatural[500],
              })}
              <CustomText
                size={10}
                textAlign="center"
                lebel={label}
                color={isFocused ? colors.red[500] : colors.neatural[500]}
              />
            </>
          </TouchableOpacity>
        );
      })}
      <RBSheet
        ref={bottomRef}
        closeDuration={200}
        closeOnDragDown={true}
        openDuration={200}
        customStyles={{container: styles.bottom}}
        height={height / 3.5}>
        <AdTypeModal bottomRef={bottomRef} />
      </RBSheet>
    </View>
  );
}

export default MyTabBar;

const onNavigateRoute = (
  type: string,
  token: string | undefined,
  navigation: any,
  route: any,
  isFocused: boolean,
  bottomRef: any,
) => {
  switch (type) {
    case 'AddEmpty':
      if (token?.length === 0 || token === undefined) {
        navigation.navigate('PhoneNumberScreen');
      } else {
        bottomRef?.current?.open();
      }
      break;
    case 'Saves':
      if (token?.length === 0 || token === undefined) {
        navigation.navigate('PhoneNumberScreen');
      } else {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({name: route.name, merge: true});
        }
      }
      break;
    default:
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({name: route.name, merge: true});
      }
  }
};
