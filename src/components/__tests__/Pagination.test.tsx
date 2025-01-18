import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../Pagination'; // Adjust the path as needed

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with total items and items per page', () => {
    render(
      <Pagination totalItems={30} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Check for the number of page buttons
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons[1].textContent).toBe('1');
    expect(pageButtons[2].textContent).toBe('2');
    expect(pageButtons[3].textContent).toBe('3');
    expect(pageButtons[4].textContent).toBe('4');
    expect(pageButtons[5].textContent).toBe('5');
  });

  test('disables previous button on the first page', () => {
    render(
      <Pagination totalItems={30} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Check that the 'Previous' button is disabled on the first page
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    render(
      <Pagination totalItems={30} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Navigate to the last page
    const nextButton = screen.getByText('Next');
    const lastPageButton = screen.getByText('6');

    fireEvent.click(lastPageButton);

    // Check that the 'Next' button is disabled on the last page
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange when a page button is clicked', () => {
    render(
      <Pagination totalItems={30} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Click on the 2nd page button
    fireEvent.click(screen.getByText('2'));

    // Check that the mock function was called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('displays the correct active page button', () => {
    render(
      <Pagination totalItems={30} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Check that the active page button is the first page initially
    const activeButton = screen.getByText('1');
    expect(activeButton).toHaveClass('active');
  });

  test('displays no pages when totalItems is 0', () => {
    render(
      <Pagination totalItems={0} itemsPerPage={5} onPageChange={mockOnPageChange} />
    );

    // Check that no page buttons are rendered
    const pageButtons = screen.queryAllByRole('button');
    expect(pageButtons.length).toBe(2); // Only previous and next buttons
  });
});
