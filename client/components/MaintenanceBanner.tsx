import { AlertTriangle, AlertCircle, Clock, X } from "lucide-react";
import { useMaintenance } from "@/contexts/MaintenanceContext";
import { useState } from "react";

export default function MaintenanceBanner() {
  const { maintenance } = useMaintenance();
  const [dismissedBanners, setDismissedBanners] = useState<Set<string>>(
    new Set(),
  );

  if (!maintenance) return null;

  const handleDismiss = (key: string) => {
    setDismissedBanners((prev) => new Set([...prev, key]));
  };

  const banners = [];

  if (maintenance.partial && !dismissedBanners.has("partial")) {
    banners.push({
      key: "partial",
      type: "partial",
      icon: AlertTriangle,
      message:
        maintenance.message ||
        "Certains services peuvent être instables en raison d'une maintenance en cours.",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
    });
  }

  if (maintenance.planned && !dismissedBanners.has("planned")) {
    banners.push({
      key: "planned",
      type: "planned",
      icon: Clock,
      message: maintenance.message || "Une maintenance est prévue",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
    });
  }

  if (maintenance.ia && !dismissedBanners.has("ia")) {
    banners.push({
      key: "ia",
      type: "ia",
      icon: AlertCircle,
      message:
        maintenance.message || "Le service IA est temporairement indisponible.",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
    });
  }

  if (maintenance.license && !dismissedBanners.has("license")) {
    banners.push({
      key: "license",
      type: "license",
      icon: AlertCircle,
      message:
        maintenance.message ||
        "Le service de gestion des licences est en maintenance.",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30",
      iconColor: "text-rose-400",
    });
  }

  if (banners.length === 0) return null;

  return (
    <div className="space-y-2 px-4 py-2">
      {banners.map((banner) => {
        const Icon = banner.icon;
        return (
          <div
            key={banner.key}
            className={`rounded-lg border ${banner.borderColor} ${banner.bgColor} p-3 flex items-start justify-between gap-3`}
          >
            <div className="flex items-start gap-3 flex-1">
              <Icon
                size={18}
                className={`${banner.iconColor} mt-0.5 flex-shrink-0`}
              />
              <p className="text-sm text-foreground/80">{banner.message}</p>
            </div>
            <button
              onClick={() => handleDismiss(banner.key)}
              className="p-0.5 hover:bg-white/10 rounded transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X
                size={16}
                className="text-foreground/60 hover:text-foreground/80"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
