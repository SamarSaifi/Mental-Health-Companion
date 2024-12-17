import React, { useState, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { getAIResponse } from '../utils/responses';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialMood?: string;
}

export default function ChatInterface({ initialMood }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (initialMood) {
      const userMessage: Message = {
        text: `I'm feeling ${initialMood} today`,
        sender: 'user',
        timestamp: new Date(),
      };

      const aiResponse: Message = {
        text: getAIResponse(initialMood),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages([userMessage, aiResponse]);
    }
  }, [initialMood]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const aiResponse: Message = {
      text: getAIResponse(input),
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How are you feeling today?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}