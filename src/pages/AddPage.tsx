import React, { useState } from 'react'
import { Employee } from '../App'

export default function AddPage({ employee, onSave, onCancel }: { employee?: Employee; onSave: (e: Employee | Omit<Employee, 'id'>) => void; onCancel: () => void }) {
  const [name, setName] = useState(employee?.name || '')
  const [department, setDepartment] = useState(employee?.department || '')
  const [title, setTitle] = useState(employee?.title || '')
  const [joinedAt, setJoinedAt] = useState(employee?.joinedAt || '')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !department) return alert('必須項目を入力してください')
    
    if (employee?.id) {
      // 編集モード
      onSave({ id: employee.id, name, department, title, joinedAt: joinedAt || new Date().toISOString().slice(0,10) })
    } else {
      // 新規作成モード
      onSave({ name, department, title, joinedAt: joinedAt || new Date().toISOString().slice(0,10) })
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3>{employee ? '社員編集' : '社員登録'}</h3>
      <label>氏名<input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>部署<input value={department} onChange={(e) => setDepartment(e.target.value)} /></label>
      <label>職位<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
      <label>入社日<input type="date" value={joinedAt} onChange={(e) => setJoinedAt(e.target.value)} /></label>
      <div className="actions">
        <button type="button" onClick={onCancel}>キャンセル</button>
        <button type="submit">{employee ? '更新' : '登録'}</button>
      </div>
    </form>
  )
}
