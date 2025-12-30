'use client';

import { useEffect, useState, useRef } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
  trigger?: boolean;
  onComplete?: () => void;
}

export function useTypingAnimation({
  text,
  speed = 50,
  delay = 0,
  trigger = true,
  onComplete,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const triggerRef = useRef(trigger);

  useEffect(() => {
    triggerRef.current = trigger;
  }, [trigger]);

  useEffect(() => {
    if (!triggerRef.current) {
      setDisplayedText('');
      indexRef.current = 0;
      setIsTyping(false);
      return;
    }

    // Reset when text changes
    if (indexRef.current > 0 && displayedText !== text) {
      setDisplayedText('');
      indexRef.current = 0;
    }

    const startTyping = () => {
      setIsTyping(true);
      indexRef.current = 0;
      setDisplayedText('');

      const type = () => {
        if (indexRef.current < text.length && triggerRef.current) {
          setDisplayedText(text.slice(0, indexRef.current + 1));
          indexRef.current += 1;
          timeoutRef.current = setTimeout(type, speed);
        } else {
          setIsTyping(false);
          if (onComplete && indexRef.current >= text.length) {
            onComplete();
          }
        }
      };

      if (delay > 0) {
        timeoutRef.current = setTimeout(type, delay);
      } else {
        type();
      }
    };

    startTyping();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, trigger, onComplete]);

  return { displayedText, isTyping };
}

