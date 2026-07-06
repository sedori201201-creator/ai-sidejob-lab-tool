const analyticsKey = "ai-sidejob-note-tool-analytics-v1";

function readLogs() {
  try {
    return JSON.parse(localStorage.getItem(analyticsKey) || "[]");
  } catch {
    return [];
  }
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function isToday(date) {
  const now = new Date();
  const target = new Date(date);
  return now.toDateString() === target.toDateString();
}

function isWithinDays(date, days) {
  const diff = Date.now() - new Date(date).getTime();
  return diff <= days * 24 * 60 * 60 * 1000;
}

function countBy(items, getter) {
  const map = new Map();
  items.forEach((item) => {
    const key = getter(item);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function renderMetrics(logs) {
  document.querySelector("#todayCount").textContent = logs.filter((row) => isToday(row.createdAt)).length;
  document.querySelector("#weekCount").textContent = logs.filter((row) => isWithinDays(row.createdAt, 7)).length;
  document.querySelector("#generateCount").textContent = logs.filter((row) => row.eventName === "generate_post_pack").length;
  document.querySelector("#noteOpenCount").textContent = logs.filter((row) => row.eventName === "open_note").length;
  document.querySelector("#thumbDownloadCount").textContent = logs.filter((row) => row.eventName === "download_thumbnail").length;
  document.querySelector("#totalLogs").textContent = `${logs.length}件`;
}

function renderPopularTitles(logs) {
  const source = logs.filter((row) => row.title && row.eventName === "generate_post_pack");
  const rows = countBy(source, (row) => row.title).slice(0, 10);
  document.querySelector("#popularTitles").innerHTML = rows.length
    ? rows.map(([title, count]) => `<div><span>${escapeHtml(title)}</span><strong>${count}</strong></div>`).join("")
    : `<p class="muted">まだ投稿パック作成ログがありません。</p>`;
}

function renderPopularTags(logs) {
  const tags = logs.flatMap((row) => Array.isArray(row.tags) ? row.tags : []);
  const rows = countBy(tags, (tag) => tag).slice(0, 20);
  document.querySelector("#popularTags").innerHTML = rows.length
    ? rows.map(([tag, count]) => `<span>#${escapeHtml(tag)} ${count}</span>`).join("")
    : `<p class="muted">タグログがありません。</p>`;
}

function renderTable(logs) {
  const filter = document.querySelector("#eventFilter").value;
  const rows = logs
    .filter((row) => filter === "all" || row.eventName === filter)
    .slice()
    .reverse()
    .slice(0, 200);

  document.querySelector("#logTable").innerHTML = rows
    .map((row) => `
      <tr>
        <td>${formatDate(row.createdAt)}</td>
        <td>${escapeHtml(labelEvent(row.eventName))}</td>
        <td>${escapeHtml(row.title || "")}</td>
        <td>${row.paidMode === "paid" ? "有料" : "無料"}</td>
        <td>${row.paidMode === "paid" ? `${Number(row.price || 0).toLocaleString()}円` : "-"}</td>
        <td>${escapeHtml(row.device || "")}</td>
      </tr>
    `)
    .join("");
}

function labelEvent(eventName) {
  return {
    page_view: "ページ表示",
    generate_post_pack: "投稿パック作成",
    download_thumbnail: "サムネ保存",
    download_markdown: "Markdown保存",
    open_note: "noteリンク",
    copy: "コピー",
    copy_all: "全部コピー",
    load_sample: "サンプル",
    reset: "リセット",
  }[eventName] || eventName;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function exportCsv(logs) {
  const header = ["createdAt", "eventName", "title", "audience", "goal", "paidMode", "price", "tags", "device", "referrer", "userId"];
  const lines = [
    header.join(","),
    ...logs.map((row) => header.map((key) => csvCell(Array.isArray(row[key]) ? row[key].join(" ") : row[key] ?? "")).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ai-sidejob-note-tool-logs.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function render() {
  const logs = readLogs();
  renderMetrics(logs);
  renderPopularTitles(logs);
  renderPopularTags(logs);
  renderTable(logs);
}

document.querySelector("#eventFilter").addEventListener("change", render);
document.querySelector("#exportCsvBtn").addEventListener("click", () => exportCsv(readLogs()));
document.querySelector("#clearLogsBtn").addEventListener("click", () => {
  if (!confirm("このブラウザ内の利用ログを削除しますか？")) return;
  localStorage.removeItem(analyticsKey);
  render();
});

render();
