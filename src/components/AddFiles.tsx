import {Button} from 'native-base';
import {Platform} from 'react-native';
import React from 'react';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {StoredFile} from '../types';
import {cloneFiles} from '../services';
function AddFiles({
  savedFiles,
  setSavedFiles,
}: {
  savedFiles: StoredFile[];
  setSavedFiles: (newFiles: StoredFile[]) => void;
}) {
  const storeFile = (files: DocumentPickerResponse[]) => {
    let filteredFiles = files.filter(
      f => !savedFiles.find(s => s.originalUri === f.uri),
    );
    if (Platform.OS === 'android') {
      filteredFiles = cloneFiles(filteredFiles);
    } else {
      filteredFiles = filteredFiles.map(f => ({...f, originalUri: f.uri}));
    }
    setSavedFiles([...savedFiles, ...filteredFiles]);
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
