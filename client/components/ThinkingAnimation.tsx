export function ThinkingAnimation() {
  return (
    <div
      className="rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2"
      style={{
        backgroundColor: "#111418",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex gap-1.5 items-center">
        <div
          className="w-2 h-2 rounded-full bg-orange-400 animate-threeDotPulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-orange-400 animate-threeDotPulse"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-orange-400 animate-threeDotPulse"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <span className="text-sm font-medium text-white/70 ml-1">
        L'IA réfléchit...
      </span>
    </div>
  );
}
