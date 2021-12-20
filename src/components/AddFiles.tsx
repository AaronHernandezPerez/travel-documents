import {Button} from 'native-base';
import React, {SetStateAction, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {storageKey} from '../constants/storage';

function AddFiles({
  savedFiles,
  setSavedFiles,
}: {
  savedFiles: DocumentPickerResponse[];
  setSavedFiles: React.Dispatch<SetStateAction<DocumentPickerResponse[]>>;
}) {
  useEffect(() => {
    console.log('Saved values useffect');
    AsyncStorage.getItem(storageKey)
      .then(value => {
        if (value) {
          setSavedFiles([...JSON.parse(value)]);
        }
      })
      .catch(console.error);
  }, [setSavedFiles]);

  const storeFile = (file: DocumentPickerResponse[]) => {
    const newFiles = file.filter(f => !savedFiles.find(s => s.uri === f.uri));
    setSavedFiles(files => {
      const newSavedFiles = [...files, ...newFiles];
      const jsonValue = JSON.stringify(newSavedFiles);
      AsyncStorage.setItem(storageKey, jsonValue).catch(console.error);
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
    <Button
      size="lg"
      colorScheme="blue"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      onTouchEnd={getFile}>
      Search File
    </Button>
  );
}

export default AddFiles;
