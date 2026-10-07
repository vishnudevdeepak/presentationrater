import React, { forwardRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

const Input = forwardRef(function Input(
  { className, type, ...props },
  ref,
) {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius : 0}px circle at ${mouseX}px ${mouseY}px,
            #6366f1,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        ref={ref}
        type={type}
        className={cn(
          'shadow-input flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus-visible:ring-indigo-700',
          className,
        )}
        {...props}
      />
    </motion.div>
  );
});

Input.displayName = 'Input';

export { Input };
