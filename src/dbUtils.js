// データベース確認用のユーティリティ関数
// ブラウザのコンソールで使用可能

// 現在のデータを確認
function checkDB() {
  const data = localStorage.getItem('personnel:employees')
  if (data) {
    console.log('現在の社員データ:', JSON.parse(data))
    return JSON.parse(data)
  } else {
    console.log('データが見つかりません')
    return null
  }
}

// データを削除
function clearDB() {
  localStorage.removeItem('personnel:employees')
  console.log('データベースをクリアしました')
}

// データをリセット（初期データに戻す）
function resetDB() {
  const initialData = [
    { id: '1', name: 'Alice Tanaka', department: 'Engineering', title: 'Engineer', joinedAt: '2021-04-01' },
    { id: '2', name: 'Bob Kim', department: 'Sales', title: 'Sales Manager', joinedAt: '2020-09-15' },
  ]
  localStorage.setItem('personnel:employees', JSON.stringify(initialData))
  console.log('データベースをリセットしました:', initialData)
}

// グローバルに関数を公開
window.checkDB = checkDB
window.clearDB = clearDB
window.resetDB = resetDB

console.log('DB管理関数が利用可能です: checkDB(), clearDB(), resetDB()')