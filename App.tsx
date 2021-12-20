import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, View, Button, Text, Link} from 'native-base';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileViewer from 'react-native-file-viewer';

const App = () => {
  const [savedFiles, setSavedFiles] = useState<Array<DocumentPickerResponse>>(
    [],
  );

  useEffect(() => {
    console.log('Saved values useffect');
    AsyncStorage.getItem('@storage_Key').then(value => {
      console.log('Saved values', value);
      if (value) {
        setSavedFiles([...JSON.parse(value)]);
      }
    });
  }, [setSavedFiles]);

  const storeFile = (file: DocumentPickerResponse[]) => {
    const newFiles = file.filter(f => !savedFiles.find(s => s.uri === f.uri));
    setSavedFiles(files => {
      const newSavedFiles = [...files, ...newFiles];
      const jsonValue = JSON.stringify(newSavedFiles);
      AsyncStorage.setItem('@storage_Key', jsonValue)
        .then(value => console.log('Saved successfuly', value))
        .catch(console.error);
      return newSavedFiles;
    });
  };

  const getFile = async () => {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      allowMultiSelection: true,
    });

    storeFile(file);
  };
  return (
    <NativeBaseProvider>
      <View>
        <Button onTouchEnd={getFile}>Search File, {savedFiles.length}</Button>
        {savedFiles.map((file: DocumentPickerResponse) => (
          <Link
            key={file.uri}
            onTouchEnd={() =>
              FileViewer.open(file.uri, {
                showOpenWithDialog: true,
              })
                .then(console.log)
                .catch(console.error)
            }>
            <Text>file, {file.name}</Text>
          </Link>
        ))}
      </View>
    </NativeBaseProvider>
  );
};
export default App;
