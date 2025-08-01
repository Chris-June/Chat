import React, { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Clock, TrendingUp, Info } from 'lucide-react';

const FineTuningCostCalculator: React.FC = () => {
  const [datasetSize, setDatasetSize] = useState(500);
  const [epochs, setEpochs] = useState(3);

  const { estimatedCost, estimatedTime, performanceBoost } = useMemo(() => {
    const baseCostPerExample = 0.008; // Example cost per 1k tokens for davinci-002
    const baseTimePer1kExamples = 5; // Example time in minutes

    const cost = (datasetSize / 1000) * epochs * baseCostPerExample * 1000; // Simplified cost
    const time = (datasetSize / 1000) * epochs * baseTimePer1kExamples;
    
    const boost = Math.min(100, Math.round(((datasetSize / 10000) * 0.7 + (epochs / 10) * 0.3) * 100));

    return {
      estimatedCost: cost.toFixed(2),
      estimatedTime: time.toFixed(1),
      performanceBoost: boost,
    };
  }, [datasetSize, epochs]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-white">Cost & Benefit Calculator</h3>
      <p className="text-sm text-gray-400">Fine-tuning involves trade-offs. Use the sliders to see how dataset size and training epochs affect estimated costs, time, and the potential performance boost.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Dataset Size (Number of Examples)</label>
            <Slider
              defaultValue={[datasetSize]}
              min={100}
              max={10000}
              step={100}
              onValueChange={(value) => setDatasetSize(value[0])}
            />
            <p className="text-center text-lg font-semibold text-blue-300 mt-2">{datasetSize.toLocaleString()} examples</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Training Epochs</label>
            <Slider
              defaultValue={[epochs]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setEpochs(value[0])}
            />
            <p className="text-center text-lg font-semibold text-blue-300 mt-2">{epochs} {epochs > 1 ? 'epochs' : 'epoch'}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Estimated Cost</p>
              <p className="text-2xl font-bold text-white">${estimatedCost}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Estimated Training Time</p>
              <p className="text-2xl font-bold text-white">~{estimatedTime} mins</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Potential Performance Boost</p>
              <div className="w-full bg-gray-700 rounded-full h-4 mt-1">
                <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${performanceBoost}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
        <Info className="w-4 h-4" />
        <p>Estimates are for illustrative purposes only and vary based on model, provider, and hardware.</p>
      </div>
    </div>
  );
};

export default FineTuningCostCalculator;
