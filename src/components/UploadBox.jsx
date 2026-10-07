import React from 'react';
import { Sparkles } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { formatFileSize, estimateSlideCount } from '@/utils/fileUtils';

export default function UploadBox({ selectedFile, setSelectedFile, onStartAnalysis, isLoading }) {
  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const slides = estimateSlideCount(file);
      setSelectedFile({
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.name.endsWith('.pdf') ? 'PDF Document' : 'PowerPoint Presentation',
        slidesCount: slides
      });
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full border border-dashed bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl p-2 sm:p-4">
        <FileUpload onChange={handleFileUpload} />
      </div>

      {selectedFile && (
        <button
          type="button"
          onClick={onStartAnalysis}
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl font-black text-white text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99] disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          Analyze Presentation
        </button>
      )}
    </div>
  );
}
