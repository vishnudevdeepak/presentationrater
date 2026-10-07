// Rating System definitions
export const getRatingInfo = (score) => {
  if (score >= 90) {
    return {
      label: 'Outstanding',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      badgeBg: 'bg-emerald-500',
      hex: '#10b981'
    };
  }
  if (score >= 80) {
    return {
      label: 'Excellent',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      badgeBg: 'bg-indigo-500',
      hex: '#6366f1'
    };
  }
  if (score >= 70) {
    return {
      label: 'Good',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      borderColor: 'border-blue-200 dark:border-blue-800',
      badgeBg: 'bg-blue-500',
      hex: '#3b82f6'
    };
  }
  if (score >= 60) {
    return {
      label: 'Needs Improvement',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      borderColor: 'border-amber-200 dark:border-amber-800',
      badgeBg: 'bg-amber-500',
      hex: '#f59e0b'
    };
  }
  return {
    label: 'Poor',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeBg: 'bg-rose-500',
    hex: '#ef4444'
  };
};

export const getCategoryPercentage = (score, maxScore) => {
  if (!maxScore || maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
};

export const getPriorityBadge = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'critical':
      return {
        label: '🔴 High Priority',
        bg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
      };
    case 'medium':
    case 'warning':
      return {
        label: '🟠 Medium Priority',
        bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      };
    default:
      return {
        label: '🟡 Low Priority',
        bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
      };
  }
};

