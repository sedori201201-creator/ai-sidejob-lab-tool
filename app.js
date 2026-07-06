const form = document.querySelector("#postForm");
const themeEl = document.querySelector("#theme");
const audienceEl = document.querySelector("#audience");
const goalEl = document.querySelector("#goal");
const toneEl = document.querySelector("#tone");
const lengthEl = document.querySelector("#length");
const tagsEl = document.querySelector("#tags");
const priceEl = document.querySelector("#price");
const toolCtaEnabledEl = document.querySelector("#toolCtaEnabled");
const toolUrlEl = document.querySelector("#toolUrl");
const affiliateEnabledEl = document.querySelector("#affiliateEnabled");
const affiliateUrlEl = document.querySelector("#affiliateUrl");
const affiliateTitleEl = document.querySelector("#affiliateTitle");
const generatedTitleEl = document.querySelector("#generatedTitle");
const articleTextEl = document.querySelector("#articleText");
const thumbnailPromptEl = document.querySelector("#thumbnailPrompt");
const publishTextEl = document.querySelector("#publishText");
const canvas = document.querySelector("#thumbnailCanvas");
const affiliateCardEl = document.querySelector("#affiliateCard");
const affiliateCardTitleEl = document.querySelector("#affiliateCardTitle");
const affiliateCardLinkEl = document.querySelector("#affiliateCardLink");

const sample = {
  title: "AIを使って副業時間を半分にする方法",
  audience: "副業を始めたいが時間が足りない人",
  goal: "AIを使った投稿作業の型を作る",
  tags: "副業,AI,時短",
};

function paidMode() {
  return document.querySelector("input[name='paidMode']:checked").value;
}

function cleanTitle(value) {
  return (value || sample.title).trim().replace(/^#+\s*/, "");
}

function tagList() {
  return tagsEl.value
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function makeArticle() {
  const title = cleanTitle(themeEl.value);
  const audience = audienceEl.value.trim() || sample.audience;
  const goal = goalEl.value.trim() || sample.goal;
  const tone = toneEl.value;
  const paid = paidMode();
  const price = Number(priceEl.value || 500);
  const toolUrl = toolUrlEl.value.trim();

  const opening =
    tone === "friendly"
      ? "副業が続かない理由は、能力が足りないからではありません。多くの場合、作業に時間がかかりすぎているだけです。"
      : tone === "premium"
        ? "副業で成果を出す人は、作業量を増やすより先に、作業の型を作っています。AIはその型作りに最も向いています。"
        : "副業で一番削るべきなのは、判断ではなく繰り返し作業です。AIを使う価値は、ここにあります。";

  const paidBlock =
    paid === "paid"
      ? `\n\nここから先は有料部分に入れる想定です。価格は${price}円から始め、購入者の反応が取れたら段階的に上げます。最初から高く売るより、まずは「読んだ人がすぐ使える型」を入れることが重要です。\n\n有料部分に入れる内容は、次の4つです。\n1. note本文を作るAIプロンプト\n2. サムネ文言を作るAIプロンプト\n3. Xで告知する短文テンプレ\n4. 投稿前チェックリスト\n\nこの4つがあると、読者は記事を読んで終わりではなく、自分の投稿作業にそのまま使えます。`
      : "";

  const cta =
    toolCtaEnabledEl.checked && toolUrl
      ? `\n\nこの記事と同じ流れで、本文・サムネ・投稿チェックを作れるWebツールも用意しています。\n${toolUrl}\nテーマを入れるだけで、note投稿の下書きまで作れる形にしています。`
      : "";

  return `# ${title}

${opening}

対象読者は「${audience}」です。この記事のゴールは「${goal}」です。

副業が重くなる原因は、毎回ゼロから考えていることです。ネタを考える、構成を作る、本文を書く、サムネを考える、投稿文を作る。この流れを毎回手作業でやると、1本の記事に必要以上の時間がかかります。

AIを使うなら、いきなり完成文を書かせるより、作業を分解して任せる方が安定します。まず「テーマ決め」「構成」「本文」「タイトル」「サムネ」「投稿前チェック」に分けます。このうち人間がやるべきなのは、方向性の決定と最終確認です。

最初にAIへ頼むのは構成です。「初心者向けに、結論、理由、手順、注意点、まとめで構成して」と依頼します。構成があるだけで、書き始める前の迷いが消えます。迷う時間が減ると、作業時間はかなり短くなります。

次に、毎回使う型を決めます。おすすめは「問題提起、結論、3つの手順、注意点、行動提案」です。型を固定すると、AIへの指示も安定します。投稿の品質もそろいやすくなります。

本文を書いた後は、AIに修正を任せます。「読みやすく」「初心者向けに」「売り込み感を弱めて」と指示するだけで、編集時間を減らせます。完璧な文章を一発で作るより、AIと一緒に整える方が現実的です。

サムネイルと告知文も同じ流れに入れます。本文ができたら、「この記事に合うサムネ文言を5つ」「X投稿用の短い紹介文を3つ」と依頼します。投稿後の発信まで一気に準備できます。

AIで副業時間を半分にするコツは、全部を任せることではありません。自分は方向性と判断を担当し、AIには下書き、整理、言い換え、量産を任せることです。この分担ができると、副業は根性ではなく仕組みで続けられます。${paidBlock}${cta}`;
}

function makeThumbnailPrompt(title) {
  return `note.com article thumbnail, 1280x670, simple yellow background, bold black Japanese text, exact text: "${title}", clean clock icon and small AI circuit symbol, no logo, no watermark, high readability on mobile`;
}

function makePublishText(title) {
  const tags = tagList();
  const paid = paidMode();
  const price = Number(priceEl.value || 500);

  return `note公開手順

1. 「note新規投稿を開く」を押す
2. タイトルに貼る: ${title}
3. 本文タブの内容を本文欄に貼る
4. サムネPNGを保存して、noteの見出し画像にアップロードする
5. ハッシュタグを追加する: ${tags.map((tag) => `#${tag}`).join(" ")}
6. 記事タイプを確認する: ${paid === "paid" ? `有料 ${price}円` : "無料"}
7. プレビューで本文、改行、リンクを確認する
8. 問題なければ「投稿する」を押す

注意:
HTML単体ではnoteに自動投稿できません。noteへの投稿操作はログイン済みブラウザ上で手動確認が必要です。`;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = text.split("");
  let line = "";
  const lines = [];
  chars.forEach((char) => {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });
  lines.push(line);
  lines.slice(0, 4).forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
}

function drawThumbnail(title) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffd62e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#111111";
  ctx.beginPath();
  ctx.arc(1050, 335, 150, 0, Math.PI * 2);
  ctx.lineWidth = 16;
  ctx.strokeStyle = "#111111";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(1050, 335);
  ctx.lineTo(1050, 240);
  ctx.moveTo(1050, 335);
  ctx.lineTo(1130, 385);
  ctx.stroke();

  ctx.fillStyle = "#111111";
  ctx.font = "900 88px 'Yu Gothic', 'Meiryo', sans-serif";
  ctx.textBaseline = "top";
  wrapCanvasText(ctx, title, 86, 110, 760, 112);

  ctx.font = "800 34px 'Yu Gothic', 'Meiryo', sans-serif";
  ctx.fillText("AI副業ラボ", 88, 560);
}

function updateAffiliateCard() {
  const enabled = affiliateEnabledEl.checked && affiliateUrlEl.value.trim();
  affiliateCardEl.hidden = !enabled;
  if (!enabled) return;
  affiliateCardTitleEl.textContent = affiliateTitleEl.value.trim() || "おすすめAIツール";
  affiliateCardLinkEl.href = affiliateUrlEl.value.trim();
}

function generate() {
  const title = cleanTitle(themeEl.value);
  generatedTitleEl.textContent = title;
  articleTextEl.value = makeArticle();
  thumbnailPromptEl.value = makeThumbnailPrompt(title);
  publishTextEl.value = makePublishText(title);
  drawThumbnail(title);
  updateAffiliateCard();

  localStorage.setItem(
    "ai-sidejob-note-tool",
    JSON.stringify({
      theme: themeEl.value,
      audience: audienceEl.value,
      goal: goalEl.value,
      tone: toneEl.value,
      length: lengthEl.value,
      tags: tagsEl.value,
      price: priceEl.value,
      paid: paidMode(),
      toolCta: toolCtaEnabledEl.checked,
      toolUrl: toolUrlEl.value,
      affiliateEnabled: affiliateEnabledEl.checked,
      affiliateUrl: affiliateUrlEl.value,
      affiliateTitle: affiliateTitleEl.value,
    })
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

function downloadThumbnail() {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "note-thumbnail.png";
  a.click();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});

document.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("input", generate);
  el.addEventListener("change", generate);
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
  navigator.clipboard.writeText([articleTextEl.value, thumbnailPromptEl.value, publishTextEl.value].join("\n\n---\n\n"));
});

document.querySelector("#downloadMdBtn").addEventListener("click", downloadMarkdown);
document.querySelector("#downloadThumbBtn").addEventListener("click", downloadThumbnail);

document.querySelector("#sampleBtn").addEventListener("click", () => {
  themeEl.value = sample.title;
  audienceEl.value = sample.audience;
  goalEl.value = sample.goal;
  tagsEl.value = sample.tags;
  generate();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  localStorage.removeItem("ai-sidejob-note-tool");
  form.reset();
  themeEl.value = sample.title;
  audienceEl.value = sample.audience;
  goalEl.value = sample.goal;
  tagsEl.value = sample.tags;
  priceEl.value = 500;
  toolCtaEnabledEl.checked = true;
  affiliateEnabledEl.checked = false;
  generate();
});

const saved = localStorage.getItem("ai-sidejob-note-tool");
if (saved) {
  try {
    const data = JSON.parse(saved);
    themeEl.value = data.theme || sample.title;
    audienceEl.value = data.audience || sample.audience;
    goalEl.value = data.goal || sample.goal;
    toneEl.value = data.tone || "practical";
    lengthEl.value = data.length || "1000";
    tagsEl.value = data.tags || sample.tags;
    priceEl.value = data.price || 500;
    document.querySelector(`input[name='paidMode'][value='${data.paid || "free"}']`).checked = true;
    toolCtaEnabledEl.checked = data.toolCta !== false;
    toolUrlEl.value = data.toolUrl || "";
    affiliateEnabledEl.checked = Boolean(data.affiliateEnabled);
    affiliateUrlEl.value = data.affiliateUrl || "";
    affiliateTitleEl.value = data.affiliateTitle || "おすすめAIツール";
  } catch {
    themeEl.value = sample.title;
  }
}

generate();
