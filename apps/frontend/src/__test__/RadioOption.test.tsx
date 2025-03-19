import { render, screen, fireEvent } from '@testing-library/react';
import RadioOption from '../components/RadioOption';

describe('RadioOption Component', () => {
  const mockOnChange = jest.fn();

  it('renders correctly with label', () => {
    render(
      <RadioOption
        name="test"
        value="test"
        label="Test Option"
        checked={false}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText('Test Option')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    render(
      <RadioOption
        name="test"
        value="test"
        label="Test Option"
        checked={false}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByText('Test Option'));
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
