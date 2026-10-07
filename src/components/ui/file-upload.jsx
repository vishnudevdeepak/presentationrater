import React, { useRef, useState } from 'react';
import { UploadCloud, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize, validateFile } from '@/utils/fileUtils';

export function FileUpload({ onChange }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFiles = (fileList) => {
    const nextFile = Array.from(fileList)[0];
    if (!nextFile) return;

    const validation = validateFile(nextFile);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    setFile(nextFile);
    setErrorMessage(null);
    onChange?.([nextFile]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const removeFile = (event) => {
    event.stopPropagation();
    setFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onChange?.([]);
  };

  return (
    <div
      className="w-full"
      onDrop={handleDrop}
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        if (event.currentTarget === event.target) setDragActive(false);
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.pptx,.ppt"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files || [])}
      />

      <div
        className={cn(
          'group/file relative block min-h-80 w-full overflow-hidden rounded-lg p-8 text-center transition-colors sm:p-10',
          dragActive && 'bg-sky-50/70 dark:bg-sky-950/20',
        )}
      >
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="relative z-10 flex min-h-60 flex-col items-center justify-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            {file ? 'Presentation ready' : 'Upload file'}
          </p>
          <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-500 dark:text-neutral-400">
            {file ? 'Replace or remove the selected presentation' : 'Drag or drop your presentation here'}
          </p>

          {file ? (
            <div className="relative z-20 mt-8 flex w-full max-w-xl items-center justify-between gap-4 rounded-md bg-white p-4 text-left shadow-sm dark:bg-neutral-900">
              <div className="min-w-0">
                <p className="truncate text-base text-neutral-700 dark:text-neutral-300">{file.name}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="rounded bg-gray-100 px-1 py-0.5 dark:bg-neutral-800">{file.type || 'Presentation file'}</span>
                  <span>{formatFileSize(file.size)}</span>
                  <span>Modified {new Date(file.lastModified).toLocaleDateString()}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="shrink-0 rounded px-2 py-1 text-sm font-medium text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-neutral-800"
              >
                Replace
              </button>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={removeFile}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    removeFile(event);
                  }
                }}
                className="shrink-0 rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-red-600 dark:hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Choose a presentation file"
              onClick={() => fileInputRef.current?.click()}
              className="relative mx-auto mt-8 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-2 hover:translate-x-2 hover:shadow-2xl dark:bg-neutral-900"
            >
              {dragActive ? (
                <span className="flex flex-col items-center text-sm text-neutral-600 dark:text-neutral-300">
                  Drop it
                  <UploadCloud className="h-4 w-4" />
                </span>
              ) : (
                <UploadCloud className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              )}
            </button>
          )}

          {errorMessage && (
            <p role="alert" className="relative z-20 mt-4 flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function GridPattern() {
  const columns = 41;
  const rows = 11;

  return (
    <div className="flex scale-105 flex-wrap items-center justify-center gap-px bg-gray-100 dark:bg-neutral-900">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((__, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`h-10 w-10 shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-gray-50 dark:bg-neutral-950'
                  : 'bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]'
              }`}
            />
          );
        }),
      )}
    </div>
  );
}