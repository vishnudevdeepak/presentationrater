import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  return (
    <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <FileUpload onChange={handleFileUpload} />
      <span className="sr-only">{files.length} files selected</span>
    </div>
  );
}