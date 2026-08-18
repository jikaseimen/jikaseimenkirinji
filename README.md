# 🍜 カスラーメン自家製麺キリンジ — 仮想券売機アプリ

> 仙台北四番丁二日町のカスラーメン自家製麺キリンジが自店で開発した、スマホでそのまま完結する仮想券売機です。  
> 外部サービスに一切依存しない、飲食店向け仮想券売機のオープンソース実装です。
> 飲食店の方、ご活用下さい。当店の運用は2026年4月～
![kirinji-app](https://jikaseimenkirinji.vercel.app/og.png)

## 🔗 デモ

**[https://jikaseimenkirinji.vercel.app](https://jikaseimenkirinji.vercel.app)**

このNext.jsアプリと同じ仮想券売機の仕組みを、ビルド不要の単体HTMLゲームとしても用意しています。`kenbaiki.html` をブラウザで開くだけで遊べます（`game.html`・`menmatchi.html` と同じ、フレームワーク無しの静的ファイルです）。

## 📖 概要

実店舗の券売機をそのままスマホに移植しました。お金を入れる → ボタンが光る → 押すと食券が出てくる、という実機と同じ操作感で注文できます。
お会計はレジのスタッフにお願いする、実店舗の券売機と同じ体験をそのままアプリにしています。

- テーブルのQRコードを読み取って注文
- ダウンロード無し、友達追加無し、ログイン無し
- 紙幣・硬貨ボタンでお金を投入すると、買える商品のボタンだけが光る
- ボタンを押すと食券（チケット番号）が発行される
- 発行後はその場でスタッフに画面を見せて会計するだけ

## ✨ 機能

- 📱 モバイルファースト設計
- 🗂 カテゴリタブ切り替えメニュー
- 💴 紙幣・硬貨ボタンでお金を投入するLCD残高表示
- 🔢 券売機風の番号付きボタンでメニューを選択（投入金額が足りないと押せない）
- ↺ 「おつり・返却」ボタンで投入金額をリセット
- 🛒 カート機能（数量変更・削除、変更時は投入金額に自動で返金）
- 🎫 ワンタップで食券を発行（チケット番号・受け取り目安を表示）
- 🎮 外部サービス連携無し、ブラウザだけで完結する仮想券売機ゲーム

## 🛠 使用技術

| 技術 | 用途 |
|---|---|
| [Next.js 14](https://nextjs.org/) App Router | フレームワーク |
| TypeScript | 型安全な開発 |
| Tailwind CSS | スタイリング |
| [Vercel](https://vercel.com/) | ホスティング |

## 🚀 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/jikaseimen/jikaseimenkirinji.git
cd jikaseimenkirinji
npm install
```

### 2. 開発サーバー起動

環境変数は不要です。

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

### 3. メニューを変更する

`lib/menu.ts` を編集してください。

```typescript
export const MENU_DATA: MenuCategory[] = [
  {
    category: "カテゴリ名",
    items: [
      { name: "商品名", price: 1000 },
    ],
  },
];
```

## 📦 デプロイ

Vercelへのデプロイを推奨します。

1. GitHubリポジトリをVercelにインポート
2. デプロイ

詳細は [Vercel公式ドキュメント](https://vercel.com/docs) を参照してください。

## 🎫 仮想券売機のしくみ

- メニューは実物の券売機のように番号付きボタンで表示
- カートに入れて「食券を発行する」を押すと、チケット番号と受け取り目安が発行される
- 決済はアプリ内では行わず、発行された画面をスタッフに見せてレジで会計する（実店舗の券売機と同じ流れ）
- 外部サービスへの送信は一切無し。ブラウザ内だけで完結する

## 📝 ライセンス

MIT License — 自由に使用・改変・再配布できます。

## 🏪 について

**カスラーメン自家製麺キリンジ**

あぶらかすラーメン専門店。2006年創業。仙台市青葉区二日町で営業中。

- 公式サイト [jikaseimenkirinji.com](https://jikaseimenkirinji.com)
- あぶらかすキャッチ (https://jikaseimenkirinji.com/game.html)
- 麺マッチ (https://jikaseimenkirinji.com/app/)
- 仮想券売機ゲーム (https://jikaseimenkirinji.com/kenbaiki.html)
- RAMEN_PROMPT (https://jikaseimenkirinji.com/RAMEN_PROMPT.html)
- 📍 仙台市青葉区二日町15-15第二石原ビル101
- 🕐 営業時間 11:00〜14:00 / 17:00〜20:00
- 🕐 木曜定休
- contact　jikaseimen@gmail.com

---

  

