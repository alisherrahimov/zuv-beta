import {Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const MyBottomSheet = ({getRef}: {getRef: any}) => {
  const bottomSheetRef = useRef<RBSheet>(null);

  useEffect(() => {
    let open = {
      onOpenSheet: onOpenSheet,
    };
    getRef(open);
  }, []);

  const onOpenSheet = useCallback(() => {
    bottomSheetRef.current?.open();
  }, []);

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={300}
      openDuration={250}
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <View>
        <Text>asdasd</Text>
      </View>
    </RBSheet>
  );
};

export default MyBottomSheet;
