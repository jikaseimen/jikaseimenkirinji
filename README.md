<img src="1000002559.jpg" alt="説明">
# 🍜 仙台 北四番丁 二日町 カスラーメン自家製麺キリンジ 公式サイト
ニュース

2026年10月 ClaudCode実績まとめました。

2026年10月 店の地図を3D化 しました。

2026年10月 メニューを3D化 しました。

2023年1月 tiktok開設しました。

2021年5月 油そば 温or冷はじめました。

2020年3月 ウーバーイーツはじめました。

2016年9月  京都音楽博覧会に出店しました。

2013年1月 YouTube開設しました。

2009年11月 あぶらかすテイクアウトはじめました。

2007年7月 公式サイトオープンしました。

2006年12月 オープンしました。

# 自家製麺キリンジ

2006年12月創業、宮城県仙台市青葉区二日町のラーメン店です。
名物「あぶらかすのカスラーメン」を中心に、自家製麺を生かしたメニューを展開しております。

## 🍜 お店・メニューについて
* **看板メニュー**：あぶらかすのカスラーメン2種類
* **メニュー表**：[メニューを見る](https://jikaseimen.github.io/jikaseimenkirinji/3d.html)
* **創業**：2006年12月
* **こだわり**：自家製麺と、旨味が凝縮されたあぶらかすの相性抜群な一杯をご提供しています。
* 2009年11月からは「あぶらかす」のテイクアウトも実施しています。

## 📍 店舗情報・アクセス
* **住所**：宮城県仙台市青葉区二日町15-15 第2石原ビル 101
* **アクセス**：仙台市地下鉄南北線「北四番丁駅」南1出入口より徒歩約2分（約360m）
* **道案内マップ**：[立体（3D）アクセスマップを見る](https://jikaseimen.github.io/jikaseimenkirinji/3dmap.html)

🕐 営業時間 11:00〜14:00 / 17:00〜20:00
🕐 木曜定休

電話：なし

連絡先：jikaseimen@gmail.com
## 🔗 関連リンク・SNS
* [はてなブログ](https://jikaseimenkirinji.hatenablog.com/)
* [TikTok](https://www.tiktok.com/@jikaseimenkirinji)
* [YouTubeチャンネル](https://www.youtube.com/@%E4%BB%99%E5%8F%B0%E8%87%AA%E5%AE%B6%E8%A3%BD%E9%BA%BA%E3%82%AD%E3%83%AA%E3%83%B3%E3%82%B8)
* [X（旧Twitter）](https://x.com/ramen_after_all)


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

あぶらかすラーメン専門店。2006年創業。仙台市青葉区二日町で営業中。

- 公式サイト [jikaseimenkirinji.com](https://jikaseimenkirinji.com)
- あぶらかすキャッチ (https://jikaseimenkirinji.com/game.html)
- 麺マッチ (https://jikaseimenkirinji.com/app/)
- RAMEN_PROMPT (https://jikaseimenkirinji.com/RAMEN_PROMPT.html)
- 📍 仙台市青葉区二日町15-15第二石原ビル101
- 🕐 営業時間 11:00〜14:00 / 17:00〜20:00
- 🕐 木曜定休
- contact　jikaseimen@gmail.com

---

  

