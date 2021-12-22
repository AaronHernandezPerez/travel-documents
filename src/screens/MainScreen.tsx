import React from 'react';
import {View, Box, useColorModeValue} from 'native-base';
import AddFiles from '../components/AddFiles';
import FilesList from '../components/FilesList';
import {StoredFile} from '../types';

function MainScreen({
  savedFiles,
  storeFiles,
}: {
  savedFiles: StoredFile[];
  storeFiles: (files: StoredFile[]) => void;
}) {
  return (
    <Box
      flex="1"
      safeArea
      backgroundColor={useColorModeValue('white', 'black')}>
      <AddFiles savedFiles={savedFiles} setSavedFiles={storeFiles} />
      <FilesList savedFiles={savedFiles} setSavedFiles={storeFiles} />
      <View />
    </Box>
  );
}

export default MainScreen;
