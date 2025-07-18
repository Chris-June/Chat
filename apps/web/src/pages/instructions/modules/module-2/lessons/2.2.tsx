import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Repeat, Anchor, AlertTriangle } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const initialConversation = [
  {
    role: 'user' as const,
    content: 'You are a marketing copywriter for a tech startup. Write an engaging \'About Us\' page for a new company called \'Innovate Inc.\' that builds AI-powered productivity tools. Focus on our mission to eliminate tedious tasks and unlock human creativity. Keep the tone inspiring and forward-looking.'
  },
  {
    role: 'assistant' as const,
    content: `At Innovate Inc., we believe your potential is limitless. But the reality is, tedious, repetitive tasks can stifle the very creativity that drives progress. That\'s why we\'re here.\n\nOur mission is to build intelligent tools that melt away the mundane. We create AI-powered productivity software that automates the boring, streamlines the complex, and liberates you to focus on what truly matters: the big ideas, the game-changing strategies, and the creative breakthroughs that only you can deliver.\n\nWe\'re not just building apps; we\'re crafting a future where technology serves as a true partner in your success, clearing the path for you to innovate, create, and achieve the extraordinary. Welcome to the future of productivity. Welcome to Innovate Inc.`
  }
];

const Lesson2_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">2.2 Keeping the Thread: Techniques for Coherent Conversations</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-2/2.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-2/2.3" 
            onClick={() => completeLesson(2, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Now that you understand the AI's "memory" is a finite context window, let's learn how to actively manage it. These techniques will help you keep your conversations on track, even when tackling complex, multi-step problems.
      </p>

      {/* Technique 1: Summarization */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Repeat className="w-7 h-7 mr-3 text-blue-400" />
          Technique 1: Summarize and Re-center
        </h2>
        <p className="text-gray-300 mb-4">
          This is the most powerful technique. Periodically summarizing the conversation resets the AI's focus and brings the most important information to the top of its context window.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">How to Do It:</h3>
          <p className="text-gray-400 mb-3">After a few turns, pause and write a summary. You can even ask the AI to do it for you.</p>
          <div className="space-y-3">
              <div className="relative">
                  <CopyButton textToCopy="Okay, let's recap. We're building a React component for a user profile card. It needs to display an avatar, a username, and a bio. The design should be clean and modern. Now, please write the initial JSX structure for this component." />
                  <p className="p-3 bg-gray-700 rounded-md font-mono text-sm pr-10"><strong className="text-cyan-400">Your Prompt:</strong> "Okay, let's recap. We're building a React component for a user profile card. It needs to display an avatar, a username, and a bio. The design should be clean and modern. Now, please write the initial JSX structure for this component."</p>
              </div>
              <div className="relative">
                  <CopyButton textToCopy="Please summarize the key requirements for the component we've discussed so far." />
                  <p className="p-3 bg-gray-700 rounded-md font-mono text-sm pr-10"><strong className="text-cyan-400">Or ask the AI:</strong> "Please summarize the key requirements for the component we've discussed so far."</p>
              </div>
          </div>
        </div>
      </section>

      {/* Technique 2: Explicit References */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Anchor className="w-7 h-7 mr-3 text-purple-400" />
          Technique 2: Use Explicit References
        </h2>
        <p className="text-gray-300 mb-4">
          Don't make the AI guess. Vague references like "that thing we talked about" or "the first idea" are unreliable. Instead, be specific.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
                <h4 className="font-semibold text-red-400 mb-2">Less Effective (Vague):</h4>
                <CopyButton textToCopy="Let's go with the second option. Write the code for it." />
                <p className="text-gray-300 font-mono text-sm pr-10">"Let's go with the second option. Write the code for it."</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
                <h4 className="font-semibold text-green-400 mb-2">More Effective (Specific):</h4>
                <CopyButton textToCopy="Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it." />
                <p className="text-gray-300 font-mono text-sm pr-10">"Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it."</p>
            </div>
        </div>
      </section>

      {/* Technique 3: Know When to Start a New Chat */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <AlertTriangle className="w-7 h-7 mr-3 text-yellow-400" />
            Technique 3: Know When to Start Fresh
        </h2>
        <p className="text-gray-300 mb-4">
            Sometimes the best way to manage context is to clear it completely. If you're switching to a completely unrelated task, don't just continue the same conversation.
        </p>
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
            <h3 className="font-semibold text-white mb-2">Rule of Thumb:</h3>
            <p className="text-blue-200">If the new task doesn't benefit from the memory of the old task, <strong>start a new chat</strong>. This prevents "context contamination," where irrelevant old information confuses the AI.</p>
            <p className="text-gray-400 mt-2 text-sm"><strong>Example:</strong> You just finished brainstorming marketing slogans. Now you want to write a Python script. Start a new chat for the script to ensure a clean slate.</p>
        </div>
      </section>

      {/* Try it yourself */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Repeat className="w-7 h-7 mr-3 text-blue-400" />
          Try It Yourself
        </h2>
        <p className="text-gray-300 mb-4">
          Now it's your turn. Use the chat below to practice the techniques you've learned. Try summarizing a conversation, using explicit references, and see if you can get the AI to maintain context over several turns.
        </p>
        <InlineChat initialMessages={initialConversation} placeholder="Practice summarization or ask follow-up questions..." />
      </section>


      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-2/2.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: How AI Remembers
        </Link>
        <Link 
          to="/instructions/module-2/2.3" 
          onClick={() => completeLesson(2, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Your First Project <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson2_2;
