# react-vite-ssr

それとなく SSR の仕組みを把握するために作成

## プロジェクトステータス

- [x] Vite の API を使って SSR を express のミドルウェアとして実装
- [x] Netlify に Vite アプリと Function をデプロイ
- [x] Netlify にデプロイされたアプリの `/*` (/ 以外) から `.netlify/functions/index` へのリダイレクトを確認
  - `/` のみリダイレクトされないのは `/index.html` が存在するためと思われる（リダイレクトより静的ファイルが優先される？）
- [ ] `functions/index.ts` に server.js で行っていたような SSR の処理を実装する（でいいのか）

## ギモン

- [ ] `dist/client/index.html` をどうやって無くすか
- [ ] `functions/index.ts` に SSR を実装する際、`dist/server.js` へのアクセスは可能か

## 参考 URL

- [Serer-Side Rendering | Vite](https://vitejs.dev/guide/ssr.html)
- [GitHub - playground/ssr-react](https://github.com/vitejs/vite-plugin-react/tree/main/playground/ssr-react)
- [GitHub - vite-plugin-ssr-example-netlify](https://github.com/AaronBeaudoin/vite-plugin-ssr-example-netlify)
