import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Save, X } from 'lucide-react';

interface JournalEntry {
  id: string;
  mood: string;
  text: string;
  photo?: string;
  timestamp: Date;
}

export default function FeelingsJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [isCamera, setIsCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setIsCamera(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const photo = canvas.toDataURL('image/jpeg');
      setCurrentPhoto(photo);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEntry = () => {
    if (currentText.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        mood: 'current',
        text: currentText,
        photo: currentPhoto || undefined,
        timestamp: new Date(),
      };
      setEntries([newEntry, ...entries]);
      setCurrentText('');
      setCurrentPhoto(null);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">My Feelings Journal</h2>
        <div className="space-y-4">
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="Write more about how you're feeling..."
            className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
            <button
              onClick={startCamera}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Take Photo</span>
            </button>
            <button
              onClick={saveEntry}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto"
            >
              <Save className="w-5 h-5" />
              <span>Save Entry</span>
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        {isCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Take a Photo</h3>
                <button onClick={stopCamera}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg mb-4"
              />
              <button
                onClick={capturePhoto}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Capture
              </button>
            </div>
          </div>
        )}
        {currentPhoto && (
          <div className="mt-4 relative">
            <img
              src={currentPhoto}
              alt="Selected"
              className="w-full max-h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => setCurrentPhoto(null)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500">
                {entry.timestamp.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 mb-4">{entry.text}</p>
            {entry.photo && (
              <img
                src={entry.photo}
                alt="Journal entry"
                className="w-full max-h-48 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}