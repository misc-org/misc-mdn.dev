# コードの歩き方

## ドキュメンテーション類

- そもそも SFC の書き方がわからない  
  → [Svelte docs ↗](https://svelte.jp/docs/introduction)
- ルーティングや `/src/routes` あたりの書き方, ビルドまわりがわからない  
  → [SvelteKit docs ↗](https://kit.svelte.jp/docs/introduction)

## FAQ

### スタイルで使う色はどう設定すればいい？

[`/src/lib/styles/_colors.scss` ↗](/src/lib/styles/_colors.scss) を見てみましょう. `$` から始まるのが SCSS 変数です.  
このファイルに定義されている色に関する変数はライトモードとダークモードで切り替わるようになっているので, 基本的にすべての色に使うと良いでしょう.  
また, VSCode でコーディングをする際に recommend されている拡張機能がインストールされていれば, 適切な IntelliSense が効くはずです:

![image](https://github.com/misc-org/misc-mdn.dev/assets/86721991/7c5e432d-80d3-4299-99ea-4299c312af29)

### スタイルの `$spacing-*` とか `$font-*` とかは何？

Panda CSS の [Theme ↗](https://panda-css.com/docs/customization/theme) に定義されているユーティリティークラスにインスパイアされて定義しました.  
`$spacing-*`, `$font-*` はそれぞれ `gap` プロパティや `font-size` プロパティなどで使うことを想定しており, [`/src/lib/styles/_spacings.scss` ↗](/src/lib/styles/_spacings.scss) や [`/src/lib/styles/_fonts.scss` ↗](/src/lib/styles/_fonts.scss) に定義されています.

もし, スタイルの一貫性を持たせるために足りない SCSS 変数があれば, それらのファイルを真似て ぜひ追加していってください.

### なぜ SCSS 変数を使うときにインポートせずに使えるの？

Vite の共通オプションの SCSS プロパティーに, すべての SCSS ファイル (/スタイルブロック) に use するよう設定しているからです.

[`/vite.config.ts` ↗](/vite.config.ts) を見てみましょう. `css.preprocessorOptions[extension].additionalData` に `/src/lib/styles` を import するように設定しています. これがタネ明かしです.

> [!IMPORTANT]  
> `src/lib/styles` に `global.scss` を除く, 他のファイルのスタイル (Svelte SFC のスタイルブロックを含む) で使いたい変数を定義した SCSS ファイルを追加したいとき, 同様に `/vite.config.ts` に追記することを忘れないでください.

ref: [Vite - 共通オプション ↗](https://ja.vitejs.dev/config/shared-options#css-preprocessoroptions-extension-additionaldata)

### アイコンを追加する方法は？

1. [Icônes - mdi ↗](https://icones.js.org/collection/mdi) へアクセス
1. 使いたいアイコンを検索し, そのアイコンをクリック
1. `mdi:` からはじまるアイコン名をコピー
1. Svelte ファイル内で以下のように記述 (例: `mdi:ab-testing`)

   ```svelte
   <script lang="ts">
   import Icon from "@iconify/svelte";
   </script>

   <Icon icon="mdi:ab-testing" />
   ```

   アイコンの色は親の `color` に依存しますが, 直接スタイルを当てることもできます. また, `Icon` コンポーネントの Props に `height` や `width` などの SVG 準拠の Props を渡すこともできます.

例として Material Design Icons (名前空間: `mdi`) を使いましたが, 他のアイコンセットも使うことができます.  
また, 例外として [`/src/lib/assets/icons/logo-title.ts` ↗](/src/lib/assets/icons/logo-title.ts) に定義されている `data` は MISC のアイコンです. 以下のように使うことができます:

```svelte
<script lang="ts">
   import Icon from "@iconify/svelte";
   import logoTitle from "$lib/assets/icons/logo-title";
</script>

<Icon icon={logoTitle} />
```
