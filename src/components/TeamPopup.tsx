import React from 'react';
import { X } from 'lucide-react';

interface TeamPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamPopup({ isOpen, onClose }: TeamPopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="transform transition-all duration-300 animate-popup"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-xl">
          <div className="bg-white px-8 py-6 rounded-xl relative">
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SAMAR SAIFI
              </h3>
              <p className="mt-2 text-gray-600">Team Lead & Developer</p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}