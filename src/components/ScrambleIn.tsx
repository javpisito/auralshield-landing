import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

/**
 * Entrance reveal: after `delay` ms the text resolves left-to-right at
 * 0.5 chars/frame, with a 3-character band of noise running ahead of the cursor.
 */
export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!triggered) {
      setDisplay('');
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      let cursor = 0;

      interval = setInterval(() => {
        const next = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < cursor) return char;
            if (i < cursor + 3) return randomChar();
            return '';
          })
          .join('');

        setDisplay(next);
        cursor += 0.5;

        if (cursor >= text.length) {
          if (interval) clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, triggered]);

  // Non-breaking space holds the line height before the reveal starts.
  if (!triggered) return <>{' '}</>;

  return <>{display}</>;
}
