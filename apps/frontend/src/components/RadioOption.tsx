import React from 'react';
import { cn } from '../lib/utils';

interface RadioOptionProps {
  name: string;
  value: string;
  label: string; // Kept separate for flexibility, but can match value
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  name,
  value,
  label,
  checked,
  onChange,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(value);
    }
  };

  return (
    <label
      className={cn(
        'flex items-center p-2 rounded-lg cursor-pointer border border-gray-600 hover:bg-gray-700 transition-colors',
        checked ? 'bg-primary text-white' : 'bg-gray-800 text-gray-200',
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="hidden"
        aria-label={label}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default RadioOption;
