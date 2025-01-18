import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../DataTable'; // Adjust the path based on your file structure

describe('DataTable Component', () => {
  const mockData = [
    { 's.no': 1, 'percentage.funded': 120, 'amt.pledged': 5000 },
    { 's.no': 2, 'percentage.funded': 80, 'amt.pledged': 3000 },
    { 's.no': 3, 'percentage.funded': 200, 'amt.pledged': 10000 },
  ];

  test('renders the table headers', () => {
    render(<DataTable data={mockData} />);
    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount pledged')).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    render(<DataTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockData.length + 1); // Includes header row
  });

  test('renders data correctly in the table', () => {
    render(<DataTable data={mockData} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
  });

  test('renders an empty table when data is empty', () => {
    render(<DataTable data={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1); // Only the header row
  });

  test('renders the search input box', () => {
    render(<DataTable data={mockData} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});
