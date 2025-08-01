import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FeasibilityCalculator: React.FC = () => {
  const [risk, setRisk] = useState(50);
  const [data, setData] = useState(50);
  const [reliability, setReliability] = useState(50);

  const viabilityScore = useMemo(() => {
    const riskWeight = (100 - risk) / 100;
    const dataWeight = data / 100;
    const reliabilityWeight = reliability / 100;
    return Math.round(((riskWeight + dataWeight + reliabilityWeight) / 3) * 100);
  }, [risk, data, reliability]);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-6">
      <div>
        <h4 className="font-semibold text-white mb-3 text-lg flex items-center">
          <SlidersHorizontal className="w-6 h-6 mr-3 text-cyan-400" />
          Feasibility Calculator
        </h4>
        <p className="text-gray-400 text-sm mb-4">Adjust the sliders to see how different factors affect an idea's viability.</p>
        
        <div className="space-y-5">
          {/* Technical Risk Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Technical Risk (0 = Low, 100 = High)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={risk}
              onChange={(e) => setRisk(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Data Availability Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Data Availability (0 = None, 100 = Abundant)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={data}
              onChange={(e) => setData(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Model Reliability Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Required Reliability (0 = Low, 100 = Perfect)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={reliability}
              onChange={(e) => setReliability(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-600 text-center">
        <h5 className="font-semibold text-blue-300 mb-2">Calculated Viability Score:</h5>
        <p className={`text-5xl font-bold ${getScoreColor(viabilityScore)}`}>
          {viabilityScore}
        </p>
      </div>
    </div>
  );
};

export default FeasibilityCalculator;
