import React, { useMemo, useState } from 'react'
import { Employee } from '../App'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}

export default function ListPage({ employees, onSelect, onAdd, onDelete, loading }: { employees: Employee[]; onSelect: (id: string) => void; onAdd: () => void; onDelete: (id: string) => void; loading?: boolean }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return employees
    return employees.filter((e) => e.name.toLowerCase().includes(qq) || e.department.toLowerCase().includes(qq))
  }, [q, employees])

  return (
    <div>
      <div className="toolbar">
        <input placeholder="名前・部署で検索" value={q} onChange={(e) => setQ(e.target.value)} disabled={loading} />
        <button onClick={onAdd} disabled={loading}>追加</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>氏名</th>
            <th>部署</th>
            <th>職位</th>
            <th>入社日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.department}</td>
              <td>{e.title}</td>
              <td>{formatDate(e.joinedAt)}</td>
              <td>
                <button onClick={() => onSelect(e.id)}>詳細</button>
                <button onClick={() => { if (confirm('削除してよいですか？')) onDelete(e.id) }}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
