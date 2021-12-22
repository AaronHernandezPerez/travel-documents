import React from 'react';
import {Text, FlatList, HStack, Box, Spacer, Button} from 'native-base';
import {GestureResponderEvent, Platform} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import {StoredFile} from '../types';
import FilePreview from './FilePreview';
import RNFS from 'react-native-fs';
// import {MaterialCommunityIcons} from '@expo/vector-icons';

function FilesList({
  savedFiles,
  setSavedFiles,
}: {
  savedFiles: StoredFile[];
  setSavedFiles: (newFiles: StoredFile[]) => void;
}) {
  const deleteFile = async (fileToDelete: StoredFile) => {
    if (Platform.OS === 'android') {
      try {
        const exists = await RNFS.exists(fileToDelete.uri);
        if (exists) {
          await RNFS.unlink(fileToDelete.uri).catch(console.error);
        } else {
          console.error(`File: ${fileToDelete.uri}, doesn't exists`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setSavedFiles(savedFiles.filter(f => f.uri !== fileToDelete.uri));
  };

  return (
    <FlatList
      data={savedFiles}
      renderItem={({item: file}: {item: StoredFile}) => (
        <Box
          key={file.uri}
          onTouchEnd={() =>
            FileViewer.open(file.uri, {
              showOpenWithDialog: true,
            }).catch(console.error)
          }
          borderBottomWidth="1"
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2">
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <FilePreview file={file} />
            <Text flexShrink={1} bold>
              {file.name}
            </Text>
            <Spacer />
            {/* <Icon
              onTouchEnd={() => {
                deleteFile(file);
              }}
              as={MaterialCommunityIcons}
              name="trash-can-outline"
              color="red.500"
            /> */}
            <Button
              onTouchEnd={(event: GestureResponderEvent) => {
                event.stopPropagation();
                deleteFile(file);
              }}
              colorScheme="red">
              Delete
            </Button>
          </HStack>
        </Box>
      )}
    />
  );
}

export default FilesList;
