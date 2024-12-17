import React from 'react';
import { Smile, Meh, Frown, Heart, ThumbsUp } from 'lucide-react';

interface MoodOption {
  icon: React.ReactNode;
  label: string;
  color: string;
  keyword: string;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const moods: MoodOption[] = [
    { 
      icon: <Smile className="w-8 h-8" />, 
      label: "Great", 
      color: "bg-green-100 hover:bg-green-200 text-green-600",
      keyword: "great"
    },
    { 
      icon: <ThumbsUp className="w-8 h-8" />, 
      label: "Good", 
      color: "bg-blue-100 hover:bg-blue-200 text-blue-600",
      keyword: "good"
    },
    { 
      icon: <Meh className="w-8 h-8" />, 
      label: "Okay", 
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-600",
      keyword: "okay"
    },
    { 
      icon: <Frown className="w-8 h-8" />, 
      label: "Bad", 
      color: "bg-red-100 hover:bg-red-200 text-red-600",
      keyword: "bad"
    },
    { 
      icon: <Heart className="w-8 h-8" />, 
      label: "Loved", 
      color: "bg-pink-100 hover:bg-pink-200 text-pink-600",
      keyword: "loved"
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How are you feeling today?</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onMoodSelect(mood.keyword)}
            className={`${mood.color} p-4 rounded-lg flex flex-col items-center justify-center transition-colors`}
          >
            {mood.icon}
            <span className="mt-2 font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}