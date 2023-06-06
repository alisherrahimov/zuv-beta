import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useId} from 'react';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';

const HomeLoading = () => {
  const id = useId();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 22,
          paddingBottom: 200,
        }}>
        {[1, 2, 3, 4, 4].map((item, index) => {
          return (
            <Placeholder
              key={index.toString()}
              style={{marginTop: index === 0 ? 0 : 22}}
              Animation={Fade}>
              <View style={styles.title}>
                <PlaceholderLine
                  style={{width: 30, height: 35, borderRadius: 12}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <PlaceholderLine
                    style={{marginLeft: 10, width: 200, borderRadius: 12}}
                  />
                  <PlaceholderLine
                    style={{height: 35, width: 30, borderRadius: 12}}
                  />
                </View>
              </View>
              <View>
                <PlaceholderLine
                  style={{marginLeft: 40, width: 150, borderRadius: 12}}
                />
                <PlaceholderLine
                  style={{marginLeft: 40, width: 150, borderRadius: 12}}
                />
              </View>
              <View style={styles.title}>
                <PlaceholderLine
                  style={{width: 30, height: 35, borderRadius: 12}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <PlaceholderLine
                    style={{marginLeft: 10, width: 200, borderRadius: 12}}
                  />
                  <PlaceholderLine
                    style={{height: 35, width: 70, borderRadius: 12}}
                  />
                </View>
              </View>
            </Placeholder>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeLoading;

const styles = StyleSheet.create({
  container: {},
  title: {
    top: 5,
    flexDirection: 'row',
  },
  main: {
    justifyContent: 'center',
  },
});
