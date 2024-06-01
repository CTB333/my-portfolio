import {useState} from 'react';

export function useOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return {isOpen, toggle, open, close};
}
