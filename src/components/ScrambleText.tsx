import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

/**
 * Hover-driven scramble: every character goes to noise, then resolves
 * left-to-right at 4 frames per character. Unhovering snaps back instantly.
 */
export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }

    let frame = 0;

    const interval = setInterval(() => {
      const revealed = Math.floor(frame / 4);

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealed) return char;
            return randomChar();
          })
          .join('')
      );

      frame += 1;

      if (revealed >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}
