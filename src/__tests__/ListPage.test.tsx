import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ListPage from '../pages/ListPage'
import { Employee } from '../App'

const sample: Employee[] = [
  { id: '1', name: 'Alice', department: 'Engineering', title: 'Eng', joinedAt: '2021-01-01' },
  { id: '2', name: 'Bob', department: 'Sales', title: 'Sales', joinedAt: '2020-02-02' },
]

test('filters by name and department', () => {
  render(<ListPage employees={sample} onSelect={() => {}} onAdd={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('Alice')).toBeInTheDocument()
  const input = screen.getByPlaceholderText('名前・部署で検索') as HTMLInputElement
  fireEvent.change(input, { target: { value: 'Sales' } })
  expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  expect(screen.getByText('Bob')).toBeInTheDocument()
})
