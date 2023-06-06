import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

import {colors} from '../helpers/Colors';
import {
  LogoWelcomeScreen,
  WelcomeScreenSVG_1,
  WelcomeScreenSVG_2,
  WelcomeScreenSVG_3,
} from '../assets/icons';

import CustomText from '../components/Text/CustomText';
import MyTouchableOpacity from '../components/Button/MyTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const {width} = Dimensions.get('window');
interface CarouselItemType {
  id?: number;
  title: string;
  image: React.ReactElement;
}

const carouselData: CarouselItemType[] = [
  {
    id: 1,
    title: 'Muammoning\nyechimini\natrofingizdan\ntopamiz )',
    image: <WelcomeScreenSVG_1 />,
  },
  {
    id: 2,
    title: 'Biz bilan oson\nyetkazing',
    image: <WelcomeScreenSVG_2 />,
  },
  {
    id: 3,
    title: 'Manzilga ham\ntejamkor narxda\nboring',
    image: <WelcomeScreenSVG_3 />,
  },
];

function WelcomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const Corusel = React.memo(({image, title}: CarouselItemType) => {
    return (
      <View style={styles.conruselItem}>
        <View style={styles.inside}>{image}</View>
        <View>
          <CustomText
            mrTop={20}
            lebel={title}
            fontFamily="SourceSansPro-Bold"
            size={32}
          />
        </View>
      </View>
    );
  });
  const onViewCallBack = React.useCallback(({viewableItems}: any) => {
    setActive(viewableItems[0].index);
  }, []);

  const renderButtons = useMemo(() => {
    return carouselData.map((item, i) => {
      return (
        <AnimatedButton
          onPress={() => {
            flatListRef.current?.scrollToIndex({index: i, animated: true});
          }}
          key={i.toString()}
          style={[styles.btn(i, active)]}
        />
      );
    });
  }, [active]);

  const onContinue = useCallback(() => {
    const scrollTo = () => {
      flatListRef.current?.scrollToIndex({index: active + 1, animated: true});
    };
    if (active === 0) {
      scrollTo();
    }
    if (active === 1) {
      scrollTo();
    }
    if (active === 2) {
      navigation.navigate('LanguageScreen');
    }
  }, [active, navigation]);

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <View style={styles.header} />
      <View style={styles.main}>
        <LogoWelcomeScreen />
        <View>
          <Animated.FlatList
            ref={flatListRef}
            data={carouselData}
            scrollEventThrottle={16}
            decelerationRate="fast"
            onViewableItemsChanged={onViewCallBack}
            viewabilityConfig={viewConfigRef.current}
            renderItem={({item}) => {
              return <Corusel image={item.image} title={item.title} />;
            }}
            pagingEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.btnContainer}>{renderButtons}</View>
        <View style={styles.contunie}>
          <MyTouchableOpacity onPress={onContinue}>
            <CustomText lebel="Davom etish" color={colors.white} size={18} />
          </MyTouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  conruselItem: {
    width: width - 40,
    marginTop: 80,
  },
  header: {height: Platform.OS === 'ios' ? 50 : 40},
  btnContainer: {
    flexDirection: 'row',
  },
  inside: {
    alignSelf: 'center',
  },
  contunie: {
    marginTop: 40,
  },
  main: {
    paddingHorizontal: 20,
  },
  btn: (index: number, active: number) => ({
    height: 12,
    borderRadius: 12,
    width: 52,
    backgroundColor:
      index === active ? colors.red['600'] : colors.neatural['200'],
    marginTop: 30,
    marginLeft: index === 0 ? 0 : 10,
  }),
});
