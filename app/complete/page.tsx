export default function CompletePage() {
  return (
    <div className="min-h-screen bg-kirinji-black flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-6xl">✅</div>
      <h1
        className="text-kirinji-yellow text-4xl font-black tracking-wider text-center"
        style={{ fontFamily: "'Bebas Neue', serif" }}
      >
        お支払い完了
      </h1>
      <p className="text-white/60 text-sm text-center leading-relaxed">
        ご注文ありがとうございます。<br />
        お席でお待ちください。
      </p>
      <a
        href="/"
        className="bg-kirinji-yellow text-kirinji-black font-black px-8 py-3 rounded-full text-sm tracking-wider"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        トップに戻る
      </a>
    </div>
  );
}
