# 🍜 カスラーメン自家製麺キリンジ — モバイルオーダーアプリ

> 仙台北四番丁二日町のカスラーメン自家製麺キリンジが自社開発したモバイルオーダーシステムです。  
> LINE LIFF + PayPay決済に対応した飲食店向けモバイルオーダーのオープンソース実装です。
> 飲食店の方、ご活用下さい。当店の運用は2026年4月～
![kirinji-app](https://jikaseimenkirinji.vercel.app/og.png)

## 🔗 デモ

**[https://jikaseimenkirinji.vercel.app](https://jikaseimenkirinji.vercel.app)**

## 📖 概要

券売機と併用するキャッシュレス対応のスマホで注文できる仕組みを作りました。

- テーブルのQRコードを読み取って注文
- PayPayでその場で支払い
- LINEで注文内容を送信

## ✨ 機能

- 📱 モバイルファースト設計
- 🗂 カテゴリタブ切り替えメニュー
- 🛒 カート機能（数量変更・削除）
- 💳 PayPay QRコード決済
- 💬 LINE LIFF連携（注文内容をLINEで送信）
- 🔒 セキュリティ対策済み（金額改ざん防止・レート制限・CORS）

## 🛠 使用技術

| 技術 | 用途 |
|---|---|
| [Next.js 14](https://nextjs.org/) App Router | フレームワーク |
| TypeScript | 型安全な開発 |
| Tailwind CSS | スタイリング |
| [@line/liff](https://developers.line.biz/ja/docs/liff/) | LINE連携 |
| [PayPay API](https://developer.paypay.ne.jp/) | 決済 |
| [Vercel](https://vercel.com/) | ホスティング |

## 🚀 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/jikaseimen/jikaseimenkirinji.git
cd jikaseimenkirinji
npm install
```

### 2. 環境変数を設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集：

```env
NEXT_PUBLIC_LIFF_ID=あなたのLIFF_ID
PAYPAY_API_KEY=あなたのAPIキー
PAYPAY_API_SECRET=あなたのAPIシークレット
PAYPAY_MERCHANT_ID=あなたの加盟店ID
NEXT_PUBLIC_APP_URL=https://あなたのドメイン
```

### 3. 開発サーバー起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

### 4. メニューを変更する

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
2. 環境変数を設定
3. デプロイ

詳細は [Vercel公式ドキュメント](https://vercel.com/docs) を参照してください。

## 🔒 セキュリティ

- 金額はサーバー側のメニューデータから再計算（改ざん防止）
- IPベースのレート制限（1分間10リクエストまで）
- CORS設定（自サイトからのリクエストのみ許可）
- 入力バリデーション（存在しない商品・異常な数量を拒否）

## 📝 ライセンス

MIT License — 自由に使用・改変・再配布できます。

## 🏪 について

**カスラーメン自家製麺キリンジ**

あぶらかすラーメン専門店。仙台市青葉区二日町で営業中。

- 🌐 [jikaseimenkirinji.com](https://jikaseimenkirinji.com)
- 📍 仙台市青葉区二日町15-15
- 🕐 月〜水・金 11:00〜14:00 / 17:00〜20:00
- 🕐 土・日 17:00〜20:00（木曜定休）

---

  
> プログラミング未経験でもAIと一緒に本番サービスが作れる時代になりました。
