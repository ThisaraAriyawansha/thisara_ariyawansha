"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Per-character "shutter" reveal: each letter blurs into focus while three
// duplicate slices sweep across it, mimicking a camera-shutter scan.
export default function ShutterText({
  lines,
  fontSize = 'clamp(24px, 4vw, 30px)',
  className = '',
  triggerOnView = true,
  color = 'currentColor',
  revealColor = '#1E3A8A',
  style = {},
  align = 'center',
}) {
  const [show, setShow] = useState(!triggerOnView);
  const ref = useRef(null);

  useEffect(() => {
    if (!triggerOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !show) setShow(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView, show]);

  const normalizedLines = lines.map((line) =>
    Array.isArray(line) ? line : [{ text: line }]
  );

  let globalIndex = 0;

  return (
    <div ref={ref} className={className} style={{ lineHeight: 1, ...style }}>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div key="shutter-text">
            {normalizedLines.map((line, lineIdx) => {
              const parts = [];
              line.forEach((segment, segIdx) => {
                const finalColor = !segment.color
                  ? color
                  : segment.color === 'orange'
                  ? '#FF5E1F'
                  : segment.color;
                segment.text.split(/(\s+)/).forEach((chunk, i) => {
                  if (chunk.length === 0) return;
                  if (/^\s+$/.test(chunk)) {
                    parts.push({ type: 'space', key: `${segIdx}-s-${i}` });
                  } else {
                    parts.push({ type: 'word', chars: chunk.split(''), color: finalColor, key: `${segIdx}-w-${i}` });
                  }
                });
              });

              return (
                <div key={lineIdx} className="shutter-text-wrapper" style={{ justifyContent: align }}>
                  {parts.map((part) =>
                    part.type === 'space' ? (
                      <span key={part.key} className="shutter-space" style={{ fontSize }} />
                    ) : (
                      <span key={part.key} className="shutter-word">
                        {part.chars.map((ch, r) => {
                          const idx = globalIndex++;
                          return (
                            <div className="shutter-char" key={r}>
                              <motion.span
                                className="shutter-char-main"
                                style={{ fontSize }}
                                initial={{ opacity: 0, filter: 'blur(10px)', color: revealColor }}
                                animate={{ opacity: 1, filter: 'blur(0px)', color: part.color }}
                                transition={{ delay: idx * 0.04 + 0.3, duration: 0.8 }}
                              >
                                {ch}
                              </motion.span>
                              <motion.span
                                className="shutter-slice"
                                style={{ fontSize, color: revealColor }}
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '100%', opacity: [0, 1, 0] }}
                                transition={{ duration: 0.7, delay: idx * 0.04, ease: 'easeInOut' }}
                              >
                                {ch}
                              </motion.span>
                              <motion.span
                                className="shutter-slice"
                                style={{ fontSize, color: revealColor }}
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: '-100%', opacity: [0, 1, 0] }}
                                transition={{ duration: 0.7, delay: idx * 0.04 + 0.1, ease: 'easeInOut' }}
                              >
                                {ch}
                              </motion.span>
                              <motion.span
                                className="shutter-slice"
                                style={{ fontSize, color: revealColor }}
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '100%', opacity: [0, 1, 0] }}
                                transition={{ duration: 0.7, delay: idx * 0.04 + 0.2, ease: 'easeInOut' }}
                              >
                                {ch}
                              </motion.span>
                            </div>
                          );
                        })}
                      </span>
                    )
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
