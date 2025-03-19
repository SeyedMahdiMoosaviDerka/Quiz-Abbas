import { render, screen, fireEvent } from '@testing-library/react';
import RadioOption from '@/components/RadioOption';

describe('RadioOption Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly with label', () => {
    render(
      <RadioOption
        value="test"
        label="Test Option"
        isSelected={false}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Option')).toBeInTheDocument();
  });

  it('shows selected state when isSelected is true', () => {
    render(
      <RadioOption
        value="test"
        label="Test Option"
        isSelected={true}
        onChange={mockOnChange}
      />
    );

    const radioContainer = screen.getByTestId('radio-option-test');
    expect(radioContainer).toHaveClass('selected');
  });

  it('calls onChange handler when clicked', () => {
    render(
      <RadioOption
        value="test"
        label="Test Option"
        isSelected={false}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByTestId('radio-option-test'));
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
