import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

export default function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          switch (phase) {
            case 'inhale':
              setPhase('hold');
              return 7;
            case 'hold':
              setPhase('exhale');
              return 8;
            case 'exhale':
              setPhase('inhale');
              return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Breathing Exercise</h2>
      <div className="relative">
        <div
          className={`w-64 h-64 rounded-full transition-all duration-1000 flex items-center justify-center
            ${phase === 'inhale' ? 'bg-blue-100 scale-100' : ''}
            ${phase === 'hold' ? 'bg-green-100 scale-110' : ''}
            ${phase === 'exhale' ? 'bg-purple-100 scale-90' : ''}`}
        >
          <Circle
            className={`w-48 h-48 transition-all duration-1000
              ${phase === 'inhale' ? 'text-blue-500 scale-100' : ''}
              ${phase === 'hold' ? 'text-green-500 scale-110' : ''}
              ${phase === 'exhale' ? 'text-purple-500 scale-90' : ''}`}
          />
          <div className="absolute text-2xl font-bold">
            {phase === 'inhale' && 'Breathe In'}
            {phase === 'hold' && 'Hold'}
            {phase === 'exhale' && 'Breathe Out'}
            <div className="text-center text-xl">{counter}</div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isActive ? 'Pause' : 'Start'} Breathing Exercise
      </button>
    </div>
  );
}