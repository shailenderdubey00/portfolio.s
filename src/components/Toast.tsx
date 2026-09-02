import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast">
      <CheckCircle size={20} className="toast-icon" style={{ color: 'var(--accent-color)' }} />
      <span>{message}</span>
      <button onClick={onClose} className="toast-close" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
    </div>
  );
};
