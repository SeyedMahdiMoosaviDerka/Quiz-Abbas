import React from 'react';

interface RadioOptionProps {
  value: string;
  label: string;
  isSelected: boolean;
  onChange: (value: string) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  isSelected,
  onChange,
}) => {
  return (
    <div
      className={`flex items-center justify-center p-3 rounded-lg
                  ${isSelected
                    ? 'bg-primary text-white'
                    : 'bg-black/40 text-white hover:bg-black/50'}
                  cursor-pointer`}
      onClick={() => onChange(value)}
      data-testid={`radio-option-${value}`}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default RadioOption;
