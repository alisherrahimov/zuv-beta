import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CallIcon, PlaneIcon, QuestionIcon} from '../assets/icons';

import {colors} from '../helpers/Colors';

import useLanguage from '../hooks/useLanguage';
import OtherHeader from '../components/MyHeader/OtherHeader';
import CustomText from '../components/Text/CustomText';

interface HelpScreenListItem {
  id: number;
  title: string;
  subtitle: string;
  icon: Element;
  phone: string;
}

const HelpScreen = () => {
  const t = useLanguage();
  function handleHelpScreenBtn(phone: string) {
    Linking.openURL(`tel:${phone}`);
  }

  const helpScreenList: HelpScreenListItem[] = [
    {
      id: 1,
      title: t('first_title'),
      subtitle: t('firstSubtitle'),
      icon: <PlaneIcon />,
      phone: '+998 91 435 45 45',
    },

    {
      id: 2,
      title: t('helpScreenTitle'),
      subtitle: t('helpScreenSubtitle'),
      icon: <QuestionIcon />,
      phone: '+998 99 906 07 07',
    },
  ];

  return (
    <View style={styles.con}>
      <OtherHeader title={t('help')} />
      <ScrollView>
        {helpScreenList.map((item, index: number) => {
          return (
            <View key={index} style={styles.card}>
              <View style={styles.iconCn}>
                <>
                  {item.icon}
                  <CustomText mnLeft={12} size={16} lebel={item.title} />
                </>
              </View>
              <View style={styles.mainText}>
                <CustomText lebel={item.subtitle} />
                <TouchableOpacity
                  onPress={() => {
                    handleHelpScreenBtn(item.phone);
                  }}
                  style={styles.phone}>
                  <CustomText lebel={item.phone} size={16} />
                  <CallIcon />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

export const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  card: {
    padding: 16,
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
  },
  iconCn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    marginLeft: 42,
    marginTop: 16,
  },
});
