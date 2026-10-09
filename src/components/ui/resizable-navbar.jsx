import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Sparkles, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn('sticky inset-x-0 top-0 z-40 w-full', className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
}

export function NavBody({ children, className = '', visible = false }) {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '40%' : '100%',
        y: visible ? 20 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 50 }}
      style={{ minWidth: '800px' }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function NavItems({ items = [], className = '', onItemClick }) {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-semibold text-black transition duration-200 hover:text-black lg:flex lg:space-x-2',
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive =
          location.pathname === item.link ||
          (item.link !== '/' && location.pathname.startsWith(item.link));

        return (
          <Link
            key={`link-${idx}`}
            to={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              'relative px-4 py-2 transition-colors',
              isActive
                ? 'text-indigo-600 font-black'
                : 'text-black font-semibold hover:text-black',
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-slate-100"
              />
            )}
            <span className="relative z-20 text-black">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}

export function MobileNav({ children, className = '', visible = false }) {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '90%' : '100%',
        paddingRight: visible ? '12px' : '0px',
        paddingLeft: visible ? '12px' : '0px',
        borderRadius: visible ? '4px' : '2rem',
        y: visible ? 20 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 50 }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function MobileNavHeader({ children, className = '' }) {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  );
}

export function MobileNavMenu({ children, className = '', isOpen, onClose: _onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MobileNavToggle({ isOpen, onClick }) {
  return isOpen ? (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg p-2 text-black transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
      aria-label="Toggle navigation menu"
    >
      <X className="h-6 w-6" />
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg p-2 text-black transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
      aria-label="Toggle navigation menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

export function NavbarLogo({ title = 'SlideScore', highlight = 'AI', to = '/' }) {
  return (
    <Link
      to={to}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500 p-0.5 shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-slate-900">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <span className="flex items-center gap-1 text-lg font-medium text-black dark:text-white">
        {title}
        <span className="gradient-text">{highlight}</span>
      </span>
    </Link>
  );
}

export function NavbarButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  to,
  href,
  as: Tag = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition duration-200 hover:-translate-y-0.5';

  const variantStyles = {
    primary:
      'shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] bg-indigo-600 text-white hover:bg-indigo-700',
    secondary:
      'bg-transparent shadow-none text-black font-bold hover:bg-slate-100 hover:text-black',
    dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    gradient:
      'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
    danger:
      'border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60',
  };

  const combinedClass = cn(baseStyles, variantStyles[variant] || variantStyles.primary, className);

  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Tag type={Tag === 'button' ? 'button' : undefined} className={combinedClass} onClick={onClick} {...props}>
      {children}
    </Tag>
  );
}

