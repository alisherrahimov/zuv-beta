import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
const RegionSearchLoading = () => {
  return (
    <View>
      <ScrollView>
        <Placeholder Animation={Fade}>
          {Array.from({length: 10}).map((item, index) => (
            <View key={index.toString()} style={{marginTop: 16}}>
              <PlaceholderLine width={index % 2 !== 0 ? 60 : 80} height={12} />
            </View>
          ))}
        </Placeholder>
      </ScrollView>
    </View>
  );
};

export default RegionSearchLoading;

const styles = StyleSheet.create({});
