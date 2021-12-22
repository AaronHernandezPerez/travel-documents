import {DocumentPickerResponse} from 'react-native-document-picker';
import {StoredFile} from '../types';
import RNFS from 'react-native-fs';

export function cloneFiles(files: DocumentPickerResponse[]): StoredFile[] {
  return files.map(file => {
    const newUri = `${RNFS.DocumentDirectoryPath}/${file.name}`;
    RNFS.copyFile(file.uri, newUri).then(console.log).catch(console.error);

    const newFile: StoredFile = {
      ...file,
      originalUri: file.uri,
      uri: newUri,
    };
    return newFile;
  });
}
