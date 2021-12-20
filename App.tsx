// import 'expo-font';
import React, {useState} from 'react';
import {NativeBaseProvider, View, Text, Link} from 'native-base';
import {DocumentPickerResponse} from 'react-native-document-picker';
import AddFiles from './src/components/AddFiles';
import FilesList from './src/components/FilesList';

const App = () => {
  const [savedFiles, setSavedFiles] = useState<DocumentPickerResponse[]>([]);

  return (
    <NativeBaseProvider>
      <AddFiles savedFiles={savedFiles} setSavedFiles={setSavedFiles} />
      <FilesList savedFiles={savedFiles} setSavedFiles={setSavedFiles} />
      <View />
    </NativeBaseProvider>
  );
};
export default App;
