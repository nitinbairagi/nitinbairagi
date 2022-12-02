import {Alert, BackHandler} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

export function androidbackbutton() {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.canGoBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
}
