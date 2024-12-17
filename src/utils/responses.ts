interface Response {
  keywords: string[];
  responses: string[];
}

const responsePatterns: Response[] = [
  {
    keywords: ['great', 'amazing', 'excellent', 'fantastic'],
    responses: [
      "I'm glad to hear that things are going well! What's contributing to your sense of joy or satisfaction today?",
      "That's wonderful! Would you like to explore what's making today particularly special?",
      "It's great to hear you're feeling so positive! How can we maintain this energy?"
    ]
  },
  {
    keywords: ['good', 'fine', 'well', 'nice'],
    responses: [
      "It sounds like you're feeling pretty content. What's been going well lately?",
      "That's good to hear! Is there anything specific that's made today positive?",
      "I'm happy things are good! Would you like to talk about what's working well?"
    ]
  },
  {
    keywords: ['okay', 'alright', 'so-so', 'meh'],
    responses: [
      "It sounds like things are steady. Is there something specific you feel you're missing?",
      "Sometimes 'okay' can mean different things. Would you like to explore that feeling more?",
      "I hear you. Would you like to talk about what might help you feel better than just okay?"
    ]
  },
  {
    keywords: ['bad', 'terrible', 'awful', 'horrible'],
    responses: [
      "I'm sorry to hear things aren't going well. Would you like to talk about what's been difficult?",
      "That sounds challenging. Is there something specific that's troubling you?",
      "I'm here to listen. What's been making things feel bad lately?"
    ]
  },
  {
    keywords: ['loved', 'supported', 'appreciated', 'cared'],
    responses: [
      "It's wonderful to feel loved and connected! Who or what has been making you feel this way?",
      "That's such a precious feeling! Would you like to share more about these connections?",
      "I'm happy you're feeling loved! How do these relationships enrich your life?"
    ]
  }
];

export function getAIResponse(input: string): string {
  const lowercaseInput = input.toLowerCase();
  
  // Find matching response pattern
  for (const pattern of responsePatterns) {
    if (pattern.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
    }
  }
  
  // Default response if no pattern matches
  return "I hear you. Would you like to tell me more about how you're feeling?";
}