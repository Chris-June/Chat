import React, { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';

const FineTuningDataFormatter: React.FC = () => {
  const [prompt, setPrompt] = useState('User: Can you write a SQL query to find all customers from California?');
  const [completion, setCompletion] = useState('Assistant: SELECT * FROM customers WHERE state = \'CA\';');

  const formattedJsonL = useMemo(() => {
    const data = {
      prompt: prompt,
      completion: completion,
    };
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return 'Error formatting JSON.';
    }
  }, [prompt, completion]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Live Data Formatter</h3>
      <p className="text-sm text-gray-400">Fine-tuning requires structured data. Enter a prompt and a desired completion below to see how it's formatted into a single training example in JSONL format.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">Prompt (User's Input)</label>
            <Textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter the prompt..."
              className="bg-gray-900 h-32"
            />
          </div>
          <div>
            <label htmlFor="completion-input" className="block text-sm font-medium text-gray-300 mb-2">Completion (Ideal Output)</label>
            <Textarea
              id="completion-input"
              value={completion}
              onChange={(e) => setCompletion(e.target.value)}
              placeholder="Enter the ideal completion..."
              className="bg-gray-900 h-32"
            />
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
            <ArrowRight className="w-12 h-12 text-gray-500" />
        </div>

        <div className="md:hidden text-center py-4">
            <p className="text-gray-500">Formats into</p>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Formatted JSONL</label>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm text-green-300 whitespace-pre-wrap h-full min-h-[284px]">
                <code>{formattedJsonL}</code>
            </pre>
        </div>
      </div>
    </div>
  );
};

export default FineTuningDataFormatter;
