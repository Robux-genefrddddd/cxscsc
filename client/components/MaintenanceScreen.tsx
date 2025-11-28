export default function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex items-center justify-center">
      <div className="text-center max-w-md px-6 space-y-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10">
            <svg
              className="w-10 h-10 text-foreground/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Site en maintenance</h1>
          <p className="text-foreground/70 leading-relaxed">
            Nous effectuons actuellement des travaux de maintenance pour vous
            offrir une meilleure expérience.
          </p>
        </div>

        <div className="pt-4 space-y-2">
          <p className="text-sm text-foreground/60">
            Nos équipes travaillent à la restauration du service. Veuillez
            réessayer dans quelques minutes.
          </p>
          <p className="text-xs text-foreground/40">
            Merci de votre patience et de votre compréhension.
          </p>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} KeySystem
          </p>
        </div>
      </div>
    </div>
  );
}
