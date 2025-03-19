import React from 'react';
import RadioOption from './RadioOption';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
      data-testid="radio-group"
    >
      {options.map((option) => (
        <RadioOption
          key={option.value}
          value={option.value}
          label={option.label}
          isSelected={value === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
