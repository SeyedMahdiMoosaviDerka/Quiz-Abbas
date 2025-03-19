import React from 'react';
import RadioOption from './RadioOption';
import { cn } from '../../lib/utils';

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[]; // Matches Quiz.options
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-white">{label}</label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <RadioOption
            key={option}
            name={name}
            value={option}
            label={option} // Same string used for both
            checked={value === option}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
