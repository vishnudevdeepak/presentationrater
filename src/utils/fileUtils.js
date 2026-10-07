export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Please select a file to upload.' };
  }

  const validExtensions = ['.pdf', '.pptx', '.ppt'];
  const fileName = file.name.toLowerCase();
  const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

  if (!isValidExtension) {
    return {
      valid: false,
      error: 'Please upload a valid PDF or PPTX presentation file.'
    };
  }

  const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB
  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: 'Your file is larger than the 25 MB limit.'
    };
  }

  return { valid: true, error: null };
};

export const estimateSlideCount = (file) => {
  if (!file) return 10;
  // Dynamic estimate based on file size or fallback to 10-15 slides
  const baseSize = file.size / (300 * 1024); // ~300KB per slide average
  const count = Math.max(6, Math.min(24, Math.round(baseSize) || 12));
  return count;
};

