const form = document.querySelector("#postForm");
const themeEl = document.querySelector("#theme");
const audienceEl = document.querySelector("#audience");
const goalEl = document.querySelector("#goal");
const toneEl = document.querySelector("#tone");
const priceEl = document.querySelector("#price");
const styleEl = document.querySelector("#thumbnailStyle");
const generatedTitleEl = document.querySelector("#generatedTitle");
const articleTextEl = document.querySelector("#articleText");
const thumbnailPromptEl = document.querySelector("#thumbnailPrompt");
const checklistTextEl = document.querySelector("#checklistText");
const affiliateEnabledEl = document.querySelector("#affiliateEnabled");
const affiliateUrlEl = document.querySelector("#affiliateUrl");
const affiliateTitleInputEl = document.querySelector("#affiliateTitleInput");
const affiliateDescriptionInputEl = document.querySelector("#affiliateDescriptionInput");
const affiliateButtonTextEl = document.querySelector("#affiliateButtonText");
const affiliateCardEl = document.querySelector("#affiliateCard");
const affiliateTitleEl = document.querySelector("#affiliateTitle");
const affiliateDescriptionEl = document.querySelector("#affiliateDescription");
const affiliateLinkEl = document.querySelector("#affiliateLink");

const sample = {
  theme: "アプリと課金システムで月5万円を作る方法",
  audience: "AI副業をこれから始めたい初心者",
  goal: "小さなWebツールを作って月5万円を目指す",
  style: "黄色背景に黒文字、シンプル、正円にも使える",
};

function paidMode() {
  return document.querySelector("input[name='paidMode']:checked").value;
}

function normalizeTheme(value) {
  return value.trim() || sample.theme;
}

function makeTitle(theme) {
  const clean = theme.replace(/[。.!！?？]$/g, "").trim();
  if (clean.length <= 32) return clean;
  return `${clean.slice(0, 30)}...`;
}

function makeArticle({ theme, audience, goal, tone, price, paid }) {
  const title = makeTitle(theme);
  const practicalLine =
    tone === "sharp"
      ? "大事なのは、考えるだけで止めず、小さく売って数字を見ることです。"
      : tone === "premium"
        ? "大切なのは、読者が今日から動けるほど具体的な手順まで落とし込むことです。"
        : "大切なのは、難しいことから始めず、小さく試せる形にすることです。";

  const paidLead =
    paid === "paid"
      ? `ここから先は、${price}円の有料部分として、実際に使えるテンプレートと行動手順をまとめます。`
      : "ここから先は、実際に使えるテンプレートと行動手順をまとめます。";

  return `# ${title}

${theme}を考えるとき、いきなり大きなサービスや完璧なアプリを作る必要はありません。

まず見るべきなのは、「誰のどんな面倒を減らせるか」です。対象読者は、${audience}。目指すゴールは、${goal}です。

最初に作るべきものは、スマホアプリではなく、小さなWebツールです。ブラウザで開けて、入力したらすぐ結果が出る。これくらい軽い形の方が、改善も販売も早く進みます。

たとえば、記事テーマを入れるだけで、note本文、有料部分、サムネ案、投稿チェックリストまで出してくれるツール。これは「AI副業ラボ」と相性がいいです。

${practicalLine}

最初の流れはシンプルです。

1. テーマを入力する
2. AIが記事本文を作る
3. サムネ案を作る
4. 投稿用チェックリストを出す
5. noteに貼り付けて公開する

この仕組みができると、毎回ゼロから考える必要がなくなります。記事作成が作業ではなく、型になります。

月5万円を目指すなら、価格設計もシンプルです。500円の商品なら100人、1,000円の商品なら50人、2,500円の商品なら20人です。最初から大きく売るより、まず10人に使ってもらい、感想を見ながら改善する方が現実的です。

${paidLead}

## 有料部分: 具体的な作り方

### 1. 最初のWebツールに必要な入力欄

- 記事テーマ
- 読者
- 読者のゴール
- 有料か無料か
- 価格
- サムネの雰囲気
- 文字数

入力欄は多すぎない方がいいです。最初は「テーマ」「読者」「価格」だけでも十分です。

### 2. 出力するもの

- noteタイトル
- 無料部分
- 有料部分
- サムネ生成プロンプト
- 投稿チェックリスト

この5つが出れば、note投稿までかなり短縮できます。

### 3. 課金ポイント

無料版では、月3記事まで作れるようにします。有料版では、記事数を増やし、サムネ案や有料部分テンプレを追加します。

価格は最初から高くしなくて大丈夫です。

- 無料: 月3記事まで
- 月500円: 月20記事まで
- 月980円: 無制限
- 買い切り2,980円: テンプレ集付き

### 4. 販売導線

note記事で集客して、最後にこう案内します。

「この記事と同じ型で、あなた用の記事セットを作れるツールを用意しました」

この流れなら、発信と商品がつながります。

### 5. 失敗しやすいポイント

一番失敗しやすいのは、最初から多機能にすることです。ユーザーが欲しいのは、すごい機能ではなく、迷わず投稿できることです。

最初は、記事を作る。サムネ案を作る。コピーできる。この3つで十分です。

## まとめ

${theme}で大切なのは、アプリを作ることそのものではありません。面倒な作業を減らし、投稿までの流れを短くすることです。

小さなWebツールを作り、自分で使い、noteで発信し、反応があれば課金する。この順番なら、初心者でも現実的に月5万円を目指せます。`;
}

function makeThumbnailPrompt({ title, style }) {
  return `Use case: ads-marketing
Asset type: note.com article thumbnail, 16:9 landscape
Primary request: Create a clean Japanese thumbnail for the article title "${title}".
Style direction: ${style}
Composition: large readable Japanese title centered-left, simple visual symbol of AI and web tool on the right, strong mobile readability.
Color: yellow background, black text, minimal accent color.
Text verbatim: "${title}"
Constraints: no logos, no watermark, no extra small text, no clutter, note.com cover image feel.`;
}

function makeChecklist({ title, price, paid }) {
  return `投稿前チェック

- タイトル: ${title}
- 販売形式: ${paid === "paid" ? "有料" : "無料"}
- 価格: ${paid === "paid" ? `${price}円` : "なし"}
- サムネを設定した
- 無料部分と有料部分の境界を確認した
- 本文の見出しが崩れていない
- コピペ用テンプレートが読める
- アフィリエイト枠を使う場合はPR表記とリンク先を確認した
- 最後の投稿ボタンを押す前に全体を確認した`;
}

function getAffiliateData() {
  return {
    enabled: affiliateEnabledEl.checked,
    url: affiliateUrlEl.value.trim(),
    title: affiliateTitleInputEl.value.trim() || "おすすめAIツール",
    description: affiliateDescriptionInputEl.value.trim() || "AI副業の作業効率化に役立つツールです。",
    buttonText: affiliateButtonTextEl.value.trim() || "詳しく見る",
  };
}

function updateAffiliateCard() {
  const affiliate = getAffiliateData();
  const shouldShow = affiliate.enabled && affiliate.url;
  affiliateCardEl.hidden = !shouldShow;

  if (!shouldShow) return;

  affiliateTitleEl.textContent = affiliate.title;
  affiliateDescriptionEl.textContent = affiliate.description;
  affiliateLinkEl.href = affiliate.url;
  affiliateLinkEl.textContent = affiliate.buttonText;
}

function generate() {
  const theme = normalizeTheme(themeEl.value);
  const audience = audienceEl.value.trim() || sample.audience;
  const goal = goalEl.value.trim() || sample.goal;
  const tone = toneEl.value;
  const price = Number(priceEl.value || 500);
  const paid = paidMode();
  const style = styleEl.value.trim() || sample.style;
  const title = makeTitle(theme);
  const affiliate = getAffiliateData();

  const article = makeArticle({ theme, audience, goal, tone, price, paid });
  const prompt = makeThumbnailPrompt({ title, style });
  const checklist = makeChecklist({ title, price, paid });

  generatedTitleEl.textContent = title;
  articleTextEl.value = article;
  thumbnailPromptEl.value = prompt;
  checklistTextEl.value = checklist;
  updateAffiliateCard();

  localStorage.setItem(
    "ai-sidejob-post-maker",
    JSON.stringify({ theme, audience, goal, tone, price, paid, style, affiliate, article, prompt, checklist })
  );
}

function copyText(id) {
  const el = document.querySelector(`#${id}`);
  navigator.clipboard.writeText(el.value);
}

function downloadMarkdown() {
  const blob = new Blob([articleTextEl.value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "note-post.md";
  a.click();
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});

[affiliateEnabledEl, affiliateUrlEl, affiliateTitleInputEl, affiliateDescriptionInputEl, affiliateButtonTextEl].forEach((el) => {
  el.addEventListener("input", updateAffiliateCard);
  el.addEventListener("change", updateAffiliateCard);
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll(".output-view").forEach((view) => view.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.target}`).classList.add("is-active");
  });
});

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.querySelector("#copyAllBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(
    [articleTextEl.value, "---- サムネ生成プロンプト ----", thumbnailPromptEl.value, "---- 投稿チェック ----", checklistTextEl.value].join("\n\n")
  );
});

document.querySelector("#downloadMdBtn").addEventListener("click", downloadMarkdown);

document.querySelector("#sampleBtn").addEventListener("click", () => {
  themeEl.value = sample.theme;
  audienceEl.value = sample.audience;
  goalEl.value = sample.goal;
  styleEl.value = sample.style;
  generate();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  localStorage.removeItem("ai-sidejob-post-maker");
  form.reset();
  themeEl.value = "";
  audienceEl.value = sample.audience;
  goalEl.value = "月5万円の収入導線を作る";
  styleEl.value = sample.style;
  priceEl.value = 500;
  affiliateEnabledEl.checked = false;
  affiliateUrlEl.value = "";
  affiliateTitleInputEl.value = "おすすめAIツール";
  affiliateDescriptionInputEl.value = "AI副業の記事作成や作業効率化に役立つツールです。";
  affiliateButtonTextEl.value = "詳しく見る";
  generate();
});

const saved = localStorage.getItem("ai-sidejob-post-maker");
if (saved) {
  try {
    const data = JSON.parse(saved);
    themeEl.value = data.theme || "";
    audienceEl.value = data.audience || sample.audience;
    goalEl.value = data.goal || sample.goal;
    toneEl.value = data.tone || "friendly";
    priceEl.value = data.price || 500;
    styleEl.value = data.style || sample.style;
    document.querySelector(`input[name='paidMode'][value='${data.paid || "paid"}']`).checked = true;

    if (data.affiliate) {
      affiliateEnabledEl.checked = Boolean(data.affiliate.enabled);
      affiliateUrlEl.value = data.affiliate.url || "";
      affiliateTitleInputEl.value = data.affiliate.title || "おすすめAIツール";
      affiliateDescriptionInputEl.value = data.affiliate.description || "AI副業の記事作成や作業効率化に役立つツールです。";
      affiliateButtonTextEl.value = data.affiliate.buttonText || "詳しく見る";
    }
  } catch {
    themeEl.value = sample.theme;
  }
} else {
  themeEl.value = sample.theme;
}

generate();
