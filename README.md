# すごろく到達確率計算機

Cloudflare Pages でそのまま公開できる、ビルド不要の静的サイトです。

## Cloudflare Pages の設定

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Production branch: `main`

リポジトリ直下の `index.html`、`style.css`、`app.js` を公開します。`_headers` は Cloudflare Pages 用のセキュリティヘッダー設定で、公開時に自動で適用されます。

## ローカルでの確認

`index.html` をブラウザで開いてください。追加のパッケージやビルド手順は必要ありません。
