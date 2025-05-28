import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, X, File } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  file: File | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, onRemoveFile, file }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxFiles: 1,
    multiple: false,
    disabled: !!file,
  });

  const handleRemoveFile = () => {
    onRemoveFile();
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        {file ? (
          <>
            <File className="h-10 w-10 mb-4 text-blue-500" />
            <p className="text-sm text-gray-500 mb-2">{file.name}</p>
            <Button variant="destructive" size="sm" onClick={handleRemoveFile}>
              <X className="h-4 w-4 mr-2" />
              Remove File
            </Button>
          </>
        ) : (
          <div {...getRootProps()} className="w-full">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer">
              <UploadCloud className="h-10 w-10 mb-4 text-gray-500" />
              <p className="text-sm text-gray-500">
                {isDragActive ? 'Drop the file here...' : 'Drag and drop a file here, or click to select'}
              </p>
              <p className="text-xs text-gray-400 mt-2">Only .csv and .json files are allowed</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
