import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {StoredFile} from './src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storageKey} from './src/constants/storage';
import MainScreen from './src/screens/MainScreen';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

const App = () => {
  const [savedFiles, setSavedFiles] = useState<StoredFile[]>([]);
  useEffect(() => {
    AsyncStorage.getItem(storageKey)
      .then(value => {
        if (value) {
          setSavedFiles([...JSON.parse(value)]);
        }
      })
      .catch(console.error);
  }, [setSavedFiles]);

  const storeFiles = async (newFiles: StoredFile[]) => {
    const jsonValue = JSON.stringify(newFiles);
    await AsyncStorage.setItem(storageKey, jsonValue).catch(console.error);
    setSavedFiles(newFiles);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <MainScreen savedFiles={savedFiles} storeFiles={storeFiles} />
    </NativeBaseProvider>
  );
};
export default App;
