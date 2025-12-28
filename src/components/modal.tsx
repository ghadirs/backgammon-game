import React, { useEffect, MouseEvent } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
    >
      <div
        className='relative m-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl'
        onClick={handleModalContentClick}
      >
        <div className='flex items-start justify-between'>
          {title && (
            <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
          )}
          <button
            onClick={onClose}
            className='-mt-1 -mr-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400'
            aria-label='Close modal'
          >
            <X size={24} />
          </button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
