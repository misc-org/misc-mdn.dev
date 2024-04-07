# misc-mdn.dev

![img](https://raw.githubusercontent.com/misc-org/.github/main/images/background.png)

<p align="center">
情報システム部のサイト
</p>

## 主な技術スタック / Tech stack

- [Svelte ↗](https://svelte.jp/)
- [SvelteKit ↗](https://kit.svelte.jp/)
- [TypeScript ↗](https://www.typescriptlang.org/)
- [SCSS ↗](https://sass-lang.com/)
- [microCMS ↗](https://microcms.io/)

## デプロイ先 / Deploy to

[misc-mdn.dev](https://misc-mdn.dev)

## 要求環境 / Requirements

- Node.js v20
- npm v10

<details>
  <summary>NVM を用いた Node.js のインストール</summary>

- Linux / macOS

  1. [HomeBrew](https://brew.sh) をインストールする
  2. `brew install nvm` で [NVM ↗](https://github.com/nvm-sh/nvm) をインストールする

- Windows
  1. PowerShell で `winget install -e --id CoreyButler.NVMforWindows` を叩く  
     または:
     - [NVM Windows](https://github.com/coreybutler/nvm-windows) からインストーラーをダウンロード
     - インストーラーを実行

---

その後,

```bash
nvm install v20
nvm use v20
```

で, Node.js の準備が整います.

</details>

<details>
  <summary><a href="https://mise.jdx.dev/">mise ↗</a> を用いた Node.js のインストール</summary>

- Linux / macOS

  ```bash
  curl https://mise.run | sh
  mise use node@20
  ```

おわり.

</details>

## 環境変数 / Environment variable

TODO

## インストール / Installation

```bash
npm i
npm run dev

# 自動でブラウザを開かせる場合
npm run dev -- --open
```

`package-lock.json` のマイグレーション機能を持っている pnpm, Yarn, Bun などのパッケージマネージャなら, 依存関係のインストールや NPM スクリプトの実行時に時短として使っても構いません. それらが生成する lock 系は一応 gitignore しています.  
ただし, 新しい依存関係を追加するときには npm を使ってください.

## ビルド / Build

`/dist` ディレクトリに SSG されたファイルが生成されます.

```bash
npm run build
```

## その他のスクリプト / Other scripts

### コードフォーマット / Code formatting

```bash
npm run fmt
```

### Linting

[ESLint ↗](https://eslint.org/) と [Markuplint ↗](https://markuplint.dev/ja/) を使っています.

```bash
npm run lint
```

### テスト / Testing

[Vitest ↗](https://vitest.dev/) を使っています.

```bash
npm run test
```

### キャッシュクリア / Clear cache

```bash
npm run clean
```

## その他 / etc

新しく関わるメンバーのために, [コードの歩き方 - `docs/tips.md` ↗](./docs/tips.md) を準備しています. ぜひ参考にしてください.
