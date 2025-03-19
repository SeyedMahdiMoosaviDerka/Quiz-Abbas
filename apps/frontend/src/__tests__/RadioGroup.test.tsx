import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from '@/components/RadioGroup';

describe('RadioGroup Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all options', () => {
    render(
      <RadioGroup
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('marks the selected option correctly', () => {
    render(
      <RadioGroup
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
      />
    );

    const option1 = screen.getByTestId('radio-option-option1');
    const option2 = screen.getByTestId('radio-option-option2');

    expect(option1).not.toHaveClass('selected');
    expect(option2).toHaveClass('selected');
  });

  it('applies the correct grid columns class', () => {
    const { rerender } = render(
      <RadioGroup
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        columns={1}
      />
    );

    let radioGroup = screen.getByTestId('radio-group');
    expect(radioGroup).toHaveClass('grid-cols-1');

    rerender(
      <RadioGroup
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        columns={3}
      />
    );

    radioGroup = screen.getByTestId('radio-group');
    expect(radioGroup).toHaveClass('grid-cols-3');
  });

  it('calls onChange with the correct value when option is clicked', () => {
    render(
      <RadioGroup
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByTestId('radio-option-option3'));
    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });
});
