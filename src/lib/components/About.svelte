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
      自分の作ったソフトが誰かの役に立つ喜びを知ってほしい。<br />
      PC ひとつで社会に役立つものが作れます。 PC ひとつで君の世界が広がります。
      <br />
      最先端のIT技術に仲間と一緒にワクワクしながら、<br />
      夢が現実になる、未来への一歩を踏み出しましょう。<br />
    </p>
  </section>
</article>

<style lang="scss">
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

      > p {
        font-size: $size-lg;
        line-height: 1.5;
      }

      @media (max-width: 768px) {
        > p {
          font-size: $size-xs;
        }
      }
    }
  }
</style>
