export function cn(...inputs) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string') return [input];
      if (Array.isArray(input)) return input;
      return [String(input)];
    })
    .filter(Boolean)
    .join(' ');
}
