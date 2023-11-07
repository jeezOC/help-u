import React from 'react';
import { Text, View } from 'react-native';

const Settings = () => {

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
        }}
      > Settings
      </Text>
    </View>
  );
};

export default Settings;
