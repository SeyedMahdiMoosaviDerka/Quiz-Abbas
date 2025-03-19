import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from '../components/RadioGroup';

describe('RadioGroup Component', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnChange = jest.fn();

  it('renders all options', () => {
    render(
      <RadioGroup
        label="Test Group"
        name="test"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when an option is clicked', () => {
    render(
      <RadioGroup
        label="Test Group"
        name="test"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByText('Option 3'));
    expect(mockOnChange).toHaveBeenCalledWith('Option 3');
  });
});
