import React, {useState, useEffect} from 'react';
import {Avatar, Image, View} from 'native-base';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';

function FilePreview({file}: {file: DocumentPickerResponse}) {
  const [uri, setUri] = useState(file.uri);

  useEffect(() => {
    if (file.type === types.pdf) {
      PdfThumbnail.generate(file.uri, 0).then(({uri: pdfUri}) => {
        setUri(pdfUri);
      });
    }
  }, [file.type, file.uri]);
  return (
    <Avatar
      size="48px"
      source={{
        uri,
      }}
    />
  );
}

export default FilePreview;
