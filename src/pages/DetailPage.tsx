import React from 'react'
import { Employee } from '../App'

export default function DetailPage({ employee, onDelete, onEdit, onBack }: { employee: Employee; onDelete: (id: string) => void; onEdit: () => void; onBack: () => void }) {
  return (
    <div className="card">
      <h3>社員詳細</h3>
      <div>ID: {employee.id}</div>
      <div>氏名: {employee.name}</div>
      <div>部署: {employee.department}</div>
      <div>職位: {employee.title}</div>
      <div>入社日: {employee.joinedAt}</div>
      <div className="actions">
        <button onClick={onBack}>戻る</button>
        <button onClick={onEdit}>編集</button>
        <button onClick={() => { if (confirm('削除しますか？')) onDelete(employee.id) }}>削除</button>
      </div>
    </div>
  )
}
