import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AddPage from '../pages/AddPage'
import { Employee } from '../App'

test('AddPage shows correct title for new employee', () => {
  const mockSave = vi.fn()
  const mockCancel = vi.fn()
  
  render(<AddPage onSave={mockSave} onCancel={mockCancel} />)
  expect(screen.getByText('社員登録')).toBeInTheDocument()
  expect(screen.getByText('登録')).toBeInTheDocument()
})

test('AddPage shows correct title and data for editing', () => {
  const mockSave = vi.fn()
  const mockCancel = vi.fn()
  const existingEmployee: Employee = {
    id: '1',
    name: 'Existing User',
    department: 'Existing Dept',
    title: 'Manager',
    joinedAt: '2020-01-01'
  }
  
  render(<AddPage employee={existingEmployee} onSave={mockSave} onCancel={mockCancel} />)
  expect(screen.getByText('社員編集')).toBeInTheDocument()
  expect(screen.getByText('更新')).toBeInTheDocument()
  expect(screen.getByDisplayValue('Existing User')).toBeInTheDocument()
})