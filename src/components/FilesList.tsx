import {Text, FlatList, HStack, Box, Avatar, Spacer, Button} from 'native-base';
import React, {SetStateAction} from 'react';
import {GestureResponderEvent} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import FilePreview from './FilePreview';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
function FilesList({
  savedFiles,
  setSavedFiles,
}: {
  savedFiles: DocumentPickerResponse[];
  setSavedFiles: React.Dispatch<SetStateAction<DocumentPickerResponse[]>>;
}) {
  const deleteFile = (fileToDelete: DocumentPickerResponse) => {
    setSavedFiles(files => files.filter(f => f.uri !== fileToDelete.uri));
  };

  return (
    <FlatList
      data={savedFiles}
      renderItem={({item: file}: {item: DocumentPickerResponse}) => (
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
            {/* <Avatar
              size="48px"
              source={{
                uri: file.uri,
              }}
            /> */}
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
