# GitHub Pages 公開手順

このフォルダをGitHub Pagesで公開します。

## 公開するフォルダ

```text
gh-pages-ai-sidejob-lab
```

この中の `index.html` がトップページになります。

## 方法1: GitHub画面からアップロードする

1. GitHubで新しいリポジトリを作る
2. リポジトリ名を決める
   - 例: `ai-sidejob-lab-tool`
3. `gh-pages-ai-sidejob-lab` の中身をすべてアップロードする
4. GitHubの `Settings` を開く
5. `Pages` を開く
6. `Build and deployment` の `Source` を `Deploy from a branch` にする
7. `Branch` を `main`、フォルダを `/root` にする
8. `Save` を押す

公開URLは以下の形になります。

```text
https://ユーザー名.github.io/リポジトリ名/
```

## 方法2: Gitコマンドで公開する

GitHubで空のリポジトリを作ったあと、以下を実行します。

```powershell
cd "C:\Users\admin\Documents\New project\gh-pages-ai-sidejob-lab"
git init
git add .
git commit -m "Publish AI副業ラボ 投稿メーカー"
git branch -M main
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

その後、GitHubの `Settings` → `Pages` で `main` ブランチの `/root` を選びます。

## noteに貼るリンク例

```text
AI副業ラボ 投稿メーカーはこちら
https://ユーザー名.github.io/リポジトリ名/
```

## 注意

- `file:///` から始まるURLは自分のPCでしか開けません
- noteから誘導するには、GitHub Pagesで公開された `https://` のURLを貼ります
- アフィリエイトリンクを使う場合は、PR表記とリンク先を確認してください
