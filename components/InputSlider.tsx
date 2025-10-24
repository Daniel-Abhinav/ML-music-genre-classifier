
import React from 'react';

interface InputSliderProps {
  label: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSlider: React.FC<InputSliderProps> = ({ label, icon, min, max, step, value, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium text-gray-300 flex items-center">
          <span className="mr-2 text-xl">{icon}</span> {label}
        </label>
        <span className="px-2 py-1 text-sm font-bold text-blue-300 bg-blue-900/50 rounded-md">{value}</span>
      </div>
      <div className="relative">
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded-full"
          style={{ width: `${percentage}%`}}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer thumb:bg-white"
          style={{
            background: `linear-gradient(to right, #4A90E2 ${percentage}%, #374151 ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
};
