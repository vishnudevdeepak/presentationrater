import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

function GooeyFilter({ filterId, blur }) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function SearchIcon({ layoutId }) {
  return (
    <motion.svg
      layoutId={layoutId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
}

const transition = {
  duration: 0.4,
  type: 'spring',
  bounce: 0.25,
};

export function GooeyInput({
  placeholder = 'Type to search...',
  className,
  collapsedWidth = 150,
  expandedWidth = 280,
  expandedOffset = 38,
  gooeyBlur = 5,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onOpenChange,
  disabled = false,
}) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, '');
  const filterId = `gooey-filter-${safeId}`;
  const iconLayoutId = `gooey-input-icon-${safeId}`;
  const inputRef = useRef(null);
  const wasExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const searchText = isControlled ? valueProp : uncontrolledValue;

  const setSearchText = useCallback(
    (nextValue) => {
      if (!isControlled) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const setExpanded = useCallback(
    (nextValue) => {
      setIsExpanded(nextValue);
      onOpenChange?.(nextValue);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    } else if (wasExpandedRef.current) {
      setSearchText('');
    }
    wasExpandedRef.current = isExpanded;
  }, [isExpanded, setSearchText]);

  const buttonVariants = useMemo(
    () => ({
      collapsed: { width: collapsedWidth, marginLeft: 0 },
      expanded: { width: expandedWidth, marginLeft: expandedOffset },
    }),
    [collapsedWidth, expandedWidth, expandedOffset],
  );

  const handleExpand = useCallback(() => {
    if (!disabled) setExpanded(true);
  }, [disabled, setExpanded]);

  const handleBlur = useCallback(() => {
    if (!searchText) setExpanded(false);
  }, [searchText, setExpanded]);

  return (
    <div className={cn('relative flex w-full items-center justify-start', className)}>
      <GooeyFilter filterId={filterId} blur={gooeyBlur} />
      <div
        className="relative flex h-10 items-center justify-start"
        style={{ filter: `url(#${filterId})` }}
      >
        <motion.div
          className="relative flex h-10 items-center justify-center"
          variants={buttonVariants}
          initial="collapsed"
          animate={isExpanded ? 'expanded' : 'collapsed'}
          transition={transition}
        >
          {!isExpanded ? (
            <button
              type="button"
              disabled={disabled}
              onClick={handleExpand}
              aria-label={placeholder}
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
            >
              <SearchIcon layoutId={iconLayoutId} />
              <span className="truncate">{placeholder}</span>
            </button>
          ) : (
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              className="h-10 w-full min-w-0 rounded-full bg-white pl-11 pr-4 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:placeholder:text-slate-500"
            />
          )}
        </motion.div>

        {isExpanded && (
          <motion.div
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={transition}
            aria-hidden="true"
          >
            <SearchIcon layoutId={iconLayoutId} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
