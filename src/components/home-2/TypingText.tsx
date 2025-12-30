'use client';

import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  trigger?: boolean;
}

export default function TypingText({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
  trigger = true,
}: TypingTextProps) {
  const { displayedText, isTyping } = useTypingAnimation({
    text,
    speed,
    delay,
    trigger,
  });

  return (
    <span className={className}>
      {displayedText}
      {cursor && isTyping && (
        <span className="typing-cursor"></span>
      )}
    </span>
  );
}

