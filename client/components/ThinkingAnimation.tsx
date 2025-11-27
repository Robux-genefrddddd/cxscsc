export function ThinkingAnimation() {
  return (
    <div className="rounded-2xl rounded-tl-none bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 px-5 py-4 backdrop-blur-sm shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
        <span className="text-sm font-medium text-white/70">
          L'IA réfléchit...
        </span>
      </div>
    </div>
  );
}
