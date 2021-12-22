export interface StoredFile {
  uri: string;
  originalUri?: string;
  name: string;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
}
