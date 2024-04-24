<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { INFO } from "$lib/assets/info";
  import Arrow from "$lib/components/Arrow.svelte";
  import Marker from "$lib/components/Marker.svelte";
</script>

<MetaTags title={INFO.about.title} />

<div class="landing">
  <p>夢が現実になる、<wbr />未来への一歩を</p>
  <div class="arrow">
    <Arrow />
    <p>scroll</p>
  </div>
</div>

<h2>
  <Marker>about</Marker>
</h2>

<article>
  <section>
    <h3>Hi, we are MISC 👋</h3>

    <p>私たちは名電高校の情報システム部です。</p>
    <p>
      Web サイトやシステム制作やゲーム制作といったプログラミング、<br />
      IT パスポート試験や基本情報技術者試験などに向けた資格勉強をしています。
    </p>
    <p>
      また映像・音楽・3D モデリング、 3D
      プリンターやレーザーカッターを用いた作品を制作したりもします。
      個々の活動を主としつつ、コンテストや発表に向けて
      グループで活動することもあります。
    </p>

    <p>活動場所は北校舎 3 階の 315 教室(コンピューター教室) です</p>
  </section>
  <section>
    <h3>指導者メッセージ</h3>
    <p>
      プログラミングは楽しい！<br />
      自分の作ったソフトが誰かの役に立つ喜びを知って欲しい。<br />
      PC ひとつで社会に役立つものが作れます。 PC ひとつで君の世界が広がります。
      <br />
      最先端のIT技術に仲間と一緒にワクワクしながら、<br />
      夢が現実になる、未来への一歩を踏み出しましょう。<br />
    </p>
  </section>
</article>

<section id="arrow">
  <a href="/about"><p>Show more</p></a>
  <span></span>
</section>

<h2>
  <Marker>blogs</Marker>
</h2>

<style lang="scss">
  $header-height: calc(30px + $spacing-5 * 2);

  .landing {
    height: calc(100vh - $header-height);
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;

    > p {
      font-size: 2rem;
      word-break: keep-all;
      text-align: center;
      font-weight: $font-extralight;
      letter-spacing: 0.5rem;
      padding-inline: $spacing-5;
    }

    > .arrow {
      position: absolute;
      bottom: $spacing-5;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-1;
      > p {
        letter-spacing: $spacing-1;
        font-size: $size-xs;
        font-weight: $font-bold;
        text-transform: uppercase;
      }
    }
  }

  h2 {
    padding-block: $spacing-10;
  }

  article {
    padding-block: $spacing-10;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: $spacing-10;

    > section {
      display: flex;
      flex-direction: column;
      gap: $spacing-5;

      > h3 {
        font-weight: $font-extrabold;
      }
    }
  }

  #arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-5;

  > p {
    font-size: $size-md;
    line-height: 1.5;
  }
}
</style>
