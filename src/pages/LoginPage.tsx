import React, { useState } from 'react'

export default function LoginPage({ onLogin }: { onLogin: (user: string) => void }) {
  const [user, setUser] = useState('admin')
  const [pass, setPass] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // very simple check
    if (user && pass === 'password') onLogin(user)
    else alert('Login failed: use any username and password `password`')
  }

  return (
    <div className="center-card">
      <form className="card" onSubmit={submit}>
        <h2>管理者ログイン</h2>
        <label>
          ユーザー名
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>
          パスワード
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </label>
        <div className="actions">
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  )
}
