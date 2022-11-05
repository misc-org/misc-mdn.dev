# misc.dev

情報システム部のサイト(仮)です [misc.dev](https://misc.vercel.app)

## Hugo のインストール
[このサイト](https://gohugo.io/getting-started/installing/) を参考にしてください

## プレビュー
```shell
hugo server
```

## ブログの追加
`title` 部分はブログの内容に合うタイトルに変更してください
```shell
hugo --kind blog-bundle new blog/`date +'%Y/%m/'`title
```

## CSSの変更
- 基本的には[/layouts](./layouts/) のhtmlファイルを直接編集する
- デフォルトの設定は `assets/tailwind.config.js` を変更する
- TailWind では難しい場合はhtmlファイルに `styleタグ` を追加する 

基本的には TailWind に従って class を変更してください
※ styleタグ を使用する場合は他の部分に干渉しないように気を付けること

TailWind を変更する場合は以下のコマンドを実行してください
```shell
npm install  # 初回のみ
npm run build-css
```

※ [build.css](./assets/css/build.css) は自動生成されるため直接変更しないこと  
※ [base.css](./assets/css/base.css), 
[resume.css](./assets/css/resume.css), 
[styles.css](./assets/css/styles.css), 
も基本的には変更しない

## その他サイトの設定
[config.toml](./config.toml) を変更してください

## ライセンス
[MIT LICENSE](./LICENSE)
