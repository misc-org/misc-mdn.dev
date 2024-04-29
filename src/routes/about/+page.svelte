<script lang="ts">
  import Icon from "@iconify/svelte";
  import About from "$lib/components/About.svelte";
  import Marker from "$lib/components/Marker.svelte";
</script>

<h2>
  <Marker label='about' />
</h2>

<div>
  <About />
  <article>
    <h3>MISC について</h3>
    <p>
      MISC
      は、愛知工業大学名電高校で情報システム部として活動する生徒たちのグループです。<br
      />
      PC に関わることなら自由に活動でき、個人個人が興味のある分野で活動しています。
    </p>
    <h4>例えば…</h4>
    <div>
      <div>
        <p>AI、データサイエンス</p>
        <span>
          <Icon icon="devicon:python" height={40} />
          <Icon icon="devicon:tensorflow" height={40} />
          <Icon icon="devicon:pytorch" height={40} />
          <Icon icon="devicon:r" height={40} />
        </span>
      </div>
      <div>
        <p>Web 制作</p>
        <span>
          <Icon icon="devicon:html5" height={40} />
          <Icon icon="devicon:nodejs-wordmark" height={40} />
          <Icon icon="devicon:vuejs" height={40} />
          <Icon icon="devicon:svelte" height={40} />
        </span>
      </div>
      <div>
        <p>ゲーム制作</p>
        <span>
          <Icon icon="devicon:unity" height={40} />
          <Icon icon="devicon:unrealengine" height={40} />
          <Icon icon="devicon:csharp" height={40} />
        </span>
      </div>
    </div>
  </article>
  <article>
    <h3>このサイトについて</h3>
    <p>
      このサイトは、MISC のホームページとして作成されました。<br
      />制作にあたり、以下の技術を使用しています。
    </p>
    <ul>
      <li>
        <a href="https://svelte.jp/">Svelte / SvelteKit</a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org/">TypeScript</a>
      </li>
      <li>
        <a href="https://sass-lang.com/">SCSS</a>
      </li>
      <li>
        <a href="https://microcms.io/">microCMS</a>
      </li>
    </ul>
    <p>
      このサイトは、<a href="https://github.com/misc-org/misc-mdn.dev">GitHub</a
      >でソースコードを公開しています。
    </p>
  </article>
</div>

<style lang="scss">
  div {
    display: grid;
    place-items: center;

    article {
      padding-block: $spacing-10;
      text-align: center;

      h3 {
        font-weight: $font-extrabold;
        margin: $spacing-5 0;
      }

      h4 {
        font-weight: $font-bold;
        margin: $spacing-5 0;
      }

      p {
        font-size: $size-lg;
        line-height: 1.5;

        @include mobile {
          font-size: $size-xs;
        }
      }

      div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: $spacing-5;

        div {
          padding: $spacing-2;
          border-radius: 5px;
          background-color: #d9d9d9;
        }

        p {
          font-size: 1.2em;
          font-weight: $font-bold;
          color: #333;
        }

        span {
          display: flex;
          gap: $spacing-5;
        }
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: $spacing-2;
          border-radius: 5px;
          background-color: #d9d9d9;
          color: #333;
          margin: $spacing-2;
          font-size: 0.8em;
        }
      }

      a {
        text-decoration: underline;
      }
    }
  }
</style>
