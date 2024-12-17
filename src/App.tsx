import React, { useState } from 'react';
import { Heart, Wind, MessageCircle, BookOpen } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import BreathingExercise from './components/BreathingExercise';
import MoodSelector from './components/MoodSelector';
import FeelingsJournal from './components/FeelingsJournal';
import TeamPopup from './components/TeamPopup';

type Tab = 'mood' | 'chat' | 'breathing' | 'journal';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('mood');
  const [selectedMood, setSelectedMood] = useState<string | undefined>();
  const [isTeamPopupOpen, setIsTeamPopupOpen] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">MindfulAI Companion</h1>
          <p className="text-gray-600">Your personal mental wellness partner</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('mood')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'mood'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Current Mood</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('breathing')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'breathing'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <Wind className="w-5 h-5" />
              <span>Breathing Exercise</span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'journal'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Journal</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'mood' && <MoodSelector onMoodSelect={handleMoodSelect} />}
            {activeTab === 'chat' && <ChatInterface initialMood={selectedMood} />}
            {activeTab === 'breathing' && <BreathingExercise />}
            {activeTab === 'journal' && <FeelingsJournal />}
          </div>
        </div>
      </div>
      
      <footer className="bg-white shadow-lg mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} All rights reserved. Created by{' '}
            <button 
              onClick={() => setIsTeamPopupOpen(true)}
              className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              TEAM HEX
            </button>
          </p>
        </div>
      </footer>

      <TeamPopup 
        isOpen={isTeamPopupOpen} 
        onClose={() => setIsTeamPopupOpen(false)} 
      />
    </div>
  );
}

export default App;