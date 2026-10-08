import React, { useState, useEffect } from 'react';

// Single flap character cell with 3D mechanical flip effect
function FlapChar({ char = ' ' }) {
  const [prevCharVal, setPrevCharVal] = useState(char);
  const [flipping, setFlipping] = useState(false);
  const [displayChar, setDisplayChar] = useState(char);
  const [topChar, setTopChar] = useState(char);

  if (char !== prevCharVal) {
    setPrevCharVal(char);
    setFlipping(true);
    setTopChar(char);
  }

  useEffect(() => {
    if (flipping) {
      const timer = setTimeout(() => {
        setDisplayChar(topChar);
        setFlipping(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [flipping, topChar]);

  return (
    <div className="relative w-7 h-10 sm:w-9 sm:h-12 md:w-11 md:h-14 bg-white rounded-md shadow-sm border border-slate-300 flex flex-col items-center justify-center font-mono font-black text-black select-none overflow-hidden group">
      
      {/* Top Half */}
      <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-slate-50 overflow-hidden flex items-end justify-center pb-[1px] border-b border-slate-300">
        <span className="translate-y-1/2 text-sm sm:text-base md:text-xl font-black tracking-widest text-black">
          {topChar}
        </span>
      </div>

      {/* Bottom Half */}
      <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-white overflow-hidden flex items-start justify-center pt-[1px]">
        <span className="-translate-y-1/2 text-sm sm:text-base md:text-xl font-black tracking-widest text-black">
          {displayChar}
        </span>
      </div>

      {/* Center split line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-300 shadow-sm z-20 pointer-events-none" />

      {/* Mechanical side pegs */}
      <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-slate-400 rounded-sm z-30" />
      <div className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-slate-400 rounded-sm z-30" />

      {/* Flipping Flap Layer */}
      {flipping && (
        <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-slate-100 overflow-hidden flex items-end justify-center pb-[1px] origin-bottom animate-flap-down z-10 border-b border-slate-300">
          <span className="translate-y-1/2 text-sm sm:text-base md:text-xl font-black tracking-widest text-black">
            {displayChar}
          </span>
        </div>
      )}
    </div>
  );
}

export function TextFlippingBoard({ text = '', maxCols = 22 }) {
  // Break incoming text by line breaks
  const lines = text.split('\n');

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 sm:p-8 rounded-3xl bg-slate-100 border border-slate-300 shadow-lg max-w-full overflow-x-auto">
      {lines.map((lineText, lineIdx) => {
        // Pad line to fixed width
        const padded = lineText.toUpperCase().padEnd(maxCols, ' ').slice(0, maxCols);
        const chars = padded.split('');

        return (
          <div key={lineIdx} className="flex items-center gap-1 sm:gap-1.5">
            {chars.map((ch, charIdx) => (
              <FlapChar key={`${lineIdx}-${charIdx}`} char={ch} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

