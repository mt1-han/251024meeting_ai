import React, { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import AddPage from './pages/AddPage'
import { EmployeeAPI } from './api/employeeAPI'

export type Employee = {
  id: string
  name: string
  department: string
  title: string
  joinedAt: string // ISO date
}

type Page = 'list' | 'detail' | 'add'

export default function App() {
  const [user, setUser] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>('list')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [useAPI, setUseAPI] = useState(true) // API/localStorage切り替え

  // データ読み込み
  const loadEmployees = async () => {
    setLoading(true)
    try {
      if (useAPI) {
        const data = await EmployeeAPI.getAll()
        setEmployees(data)
      } else {
        // localStorage fallback
        const raw = localStorage.getItem('personnel:employees')
        if (raw) {
          setEmployees(JSON.parse(raw))
        } else {
          // 初期データ設定
          const initialData = [
            { id: '1', name: 'Alice Tanaka', department: 'Engineering', title: 'Engineer', joinedAt: '2021-04-01' },
            { id: '2', name: 'Bob Kim', department: 'Sales', title: 'Sales Manager', joinedAt: '2020-09-15' },
          ]
          setEmployees(initialData)
          localStorage.setItem('personnel:employees', JSON.stringify(initialData))
        }
      }
    } catch (error) {
      console.error('データ読み込みエラー:', error)
      // API失敗時はlocalStorageにフォールバック
      setUseAPI(false)
      const raw = localStorage.getItem('personnel:employees')
      if (raw) setEmployees(JSON.parse(raw))
    }
    setLoading(false)
  }

  useEffect(() => {
    loadEmployees()
  }, [useAPI])

  // localStorageモード時のデータ保存
  useEffect(() => {
    if (!useAPI && employees.length > 0) {
      localStorage.setItem('personnel:employees', JSON.stringify(employees))
    }
  }, [employees, useAPI])

  const selectedEmployee = selectedEmployeeId ? employees.find(e => e.id === selectedEmployeeId) : null

  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    setLoading(true)
    try {
      if (useAPI) {
        await EmployeeAPI.create(employee)
        await loadEmployees() // 最新データを再読み込み
      } else {
        const newEmployee = { ...employee, id: Date.now().toString() }
        setEmployees(s => [...s, newEmployee])
      }
      setCurrentPage('list')
    } catch (error) {
      console.error('社員追加エラー:', error)
      alert('社員の追加に失敗しました')
    }
    setLoading(false)
  }

  const updateEmployee = async (employee: Employee) => {
    setLoading(true)
    try {
      if (useAPI) {
        await EmployeeAPI.update(employee.id, employee)
        await loadEmployees() // 最新データを再読み込み
      } else {
        setEmployees(s => s.map(e => e.id === employee.id ? employee : e))
      }
      setCurrentPage('list')
    } catch (error) {
      console.error('社員更新エラー:', error)
      alert('社員の更新に失敗しました')
    }
    setLoading(false)
  }

  const deleteEmployee = async (id: string) => {
    setLoading(true)
    try {
      if (useAPI) {
        await EmployeeAPI.delete(id)
        await loadEmployees() // 最新データを再読み込み
      } else {
        setEmployees(s => s.filter(e => e.id !== id))
      }
      setCurrentPage('list')
    } catch (error) {
      console.error('社員削除エラー:', error)
      alert('社員の削除に失敗しました')
    }
    setLoading(false)
  }

  const selectEmployee = (id: string) => {
    setSelectedEmployeeId(id)
    setCurrentPage('detail')
  }

  if (!user) return <LoginPage onLogin={(u) => setUser(u)} />

  return (
    <div className="app">
      <header className="app-header">
        <h1>人１J事管理アプリ</h1>
        <div className="header-controls">
          <label className="api-toggle">
            <input 
              type="checkbox" 
              checked={useAPI} 
              onChange={(e) => setUseAPI(e.target.checked)}
              disabled={loading}
            />
            JSON Server API使用
          </label>
          <span>{user}</span>
          <button onClick={() => setUser(null)}>ログアウト</button>
        </div>
      </header>
      <main>
        {loading && <div className="loading">読み込み中...</div>}
        {currentPage === 'list' && (
          <ListPage 
            employees={employees} 
            onSelect={selectEmployee} 
            onAdd={() => setCurrentPage('add')} 
            onDelete={deleteEmployee}
            loading={loading}
          />
        )}
        {currentPage === 'detail' && selectedEmployee && (
          <DetailPage 
            employee={selectedEmployee} 
            onDelete={deleteEmployee}
            onEdit={() => setCurrentPage('add')}
            onBack={() => setCurrentPage('list')}
          />
        )}
        {currentPage === 'add' && (
          <AddPage 
            employee={selectedEmployee || undefined} 
            onSave={selectedEmployee ? 
              (e) => updateEmployee(e as Employee) : 
              (e) => addEmployee(e as Omit<Employee, 'id'>)
            }
            onCancel={() => setCurrentPage('list')}
          />
        )}
      </main>
    </div>
  )
}
