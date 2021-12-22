import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
function PermissionBlocker({children}: {children: React.ReactNode}) {
  const [allPermissionGranted, setAllPermissionGranted] = useState(false);
  const askForPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App READ_EXTERNAL_STORAGE Permission',
          message:
            'Cool Photo App needs access to your READ_EXTERNAL_STORAGE ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the READ_EXTERNAL_STORAGE');
        setAllPermissionGranted(true);
      } else {
        console.log('READ_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  askForPermissions();

  return (
    <>
      {allPermissionGranted ? (
        children
      ) : (
        <View onTouchEnd={askForPermissions}>
          <Text>You need to grant permissions</Text>
        </View>
      )}
    </>
  );
}

export default PermissionBlocker;
