import React, {useState, useEffect} from 'react';
import {Avatar} from 'native-base';
import {types} from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {StoredFile} from '../types';

function FilePreview({file}: {file: StoredFile}) {
  const [uri, setUri] = useState(file.uri);

  useEffect(() => {
    if (file.type === types.pdf) {
      PdfThumbnail.generate(file.uri, 0).then(generated => {
        setUri(generated.uri);
      });
    } else if (file.type?.startsWith('image/')) {
      console.log('Image!!!!', file);
      setUri('file://' + file.uri);
    }
    console.log('after useEffect!!!!');
    console.log({file});
    console.log(types.images);
  }, [file, file.type, file.uri]);

  return (
    <Avatar
      size="48px"
      key={'preview-' + uri}
      source={{
        uri,
      }}
    />
  );
}

export default React.memo(FilePreview);
