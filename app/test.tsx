export default function Test() {
  return (
    // 画面全体を中央揃えにするためのコンテナ
    <div className="min-h-screen flex items-center justify-center">
      {/* ボタングループのコンテナ */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ボタン1 */}
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg 
          hover:bg-indigo-700 transform hover:scale-105 
          transition-all duration-300 ease-in-out
          shadow-[0_4px_0_rgb(67,56,202)] hover:shadow-[0_2px_0_rgb(67,56,202)] 
          active:translate-y-[2px]">
          ボタン 1
        </button>

        {/* ボタン2 */}
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
          text-white rounded-lg hover:from-pink-600 hover:to-purple-600
          transition-all duration-300 ease-in-out
          shadow-lg hover:shadow-[0_0_15px_rgba(219,39,119,0.5)]
          transform hover:-translate-y-0.5">
          ボタン 2
        </button>

        {/* ボタン3 */}
        <button className="px-6 py-3 text-emerald-500 rounded-lg 
          border-2 border-emerald-500 hover:text-white
          hover:bg-emerald-500 transition-all duration-300
          relative overflow-hidden group">
          <span className="relative z-10">ボタン 3</span>
        </button>
      </div>
    </div>
  );
}
