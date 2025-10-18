import { Employee } from '../App'

const API_BASE = 'http://localhost:3001'

export class EmployeeAPI {
  // 全社員取得
  static async getAll(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE}/employees`)
    return response.json()
  }

  // 社員追加
  static async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...employee, id: Date.now().toString() })
    })
    return response.json()
  }

  // 社員更新
  static async update(id: string, employee: Employee): Promise<Employee> {
    const response = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
    return response.json()
  }

  // 社員削除
  static async delete(id: string): Promise<void> {
    await fetch(`${API_BASE}/employees/${id}`, {
      method: 'DELETE'
    })
  }

  // ID検索
  static async getById(id: string): Promise<Employee> {
    const response = await fetch(`${API_BASE}/employees/${id}`)
    return response.json()
  }

  // 検索（名前・部署）
  static async search(query: string): Promise<Employee[]> {
    const response = await fetch(`${API_BASE}/employees?q=${encodeURIComponent(query)}`)
    return response.json()
  }
}