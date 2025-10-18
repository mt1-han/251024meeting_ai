# 人事管理アプリ

React 18 + TypeScript + Vite で構築されたシンプルな人事管理SPA。

## 機能
- ログイン機能（簡易認証、パスワード = `password`）
- 社員一覧表示・氏名/部署での検索機能
- 社員の追加・編集・削除（適切な画面遷移付き）
- 社員詳細画面（編集・削除アクション）
- フォームバリデーション・削除確認ダイアログ

## ローカル実行手順

### 基本実行（localStorageモード）
1. 依存関係をインストール
   ```bash
   npm install
   ```

2. 開発サーバーを起動
   ```bash
   npm run dev
   ```

### JSON Server実行（DBサーバモード）
1. フロントエンド + APIサーバを同時起動
   ```bash
   npm run dev:full
   ```
   - フロントエンド: http://localhost:5173/
   - APIサーバ: http://localhost:3001/

### テスト実行
```bash
npm run test
```

## データ保存方式

### localStorage モード（デフォルト）
- データは `personnel:employees` キーでlocalStorageに保存
- 画面更新後も状態が維持されます

### JSON Server モード
- `db.json` ファイルでデータ永続化
- REST API経由でCRUD操作
- 複数ユーザー間でのデータ共有が可能

## 備考
- UIは `src/styles.css` でプレーンCSSを使用し、タブレット・デスクトップ対応のレスポンシブデザインです。
- API利用時は `src/api/employeeAPI.ts` でHTTPクライアント管理
